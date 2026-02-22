import { Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(private readonly prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }

  private async handleSubscriptionCreated(subscription: Stripe.Subscription) {
    const customerId = subscription.customer as string;
    const user = await this.prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    await this.prisma.$transaction([
      this.prisma.subscription.create({
        data: {
          userId: user.id,
          price: subscription.items.data[0].price.unit_amount! / 100,
          startDate: new Date(subscription.start_date * 1000),
          status: 'ACTIVE',
          stripeSubscriptionId: subscription.id,
          currentPeriodEnd: new Date(
            subscription.items.data[0].current_period_end * 1000,
          ),
        },
      }),
      this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          type: 'PAID',
        },
      }),
    ]);
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const customerId = subscription.customer as string;
    const user = await this.prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
    });
    if (!user) throw new NotFoundException('User not found');
    const isActive = subscription.status === 'active';
    await this.prisma.$transaction([
      this.prisma.subscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          status: isActive ? 'ACTIVE' : 'EXPIRED',
        },
      }),
      this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          type: isActive ? 'PAID' : 'FREE',
        },
      }),
    ]);
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const customerId = subscription.customer;
    const user = await this.prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId as string,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    await this.prisma.$transaction([
      this.prisma.subscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          status: 'EXPIRED',
        },
      }),
      this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          type: 'FREE',
        },
      }),
    ]);
  }
  async createProduct() {
    this.stripe.products
      .create({
        name: 'Starter Subscription',
        description: '$12/Month subscription',
      })
      .then((product) => {
        this.stripe.prices
          .create({
            unit_amount: 1200,
            currency: 'usd',
            recurring: {
              interval: 'month',
            },
            product: product.id,
          })
          .then((price) => {
            console.log(
              'Success! Here is your starter subscription product id: ' +
                product.id,
            );
            console.log(
              'Success! Here is your starter subscription price id: ' +
                price.id,
            );
          });
      });
  }
  async createCheckoutSession({ userId }: { userId: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await this.stripe.customers.create({
        name: user.name,
        email: user.email,
      });
      customerId = customer.id;
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          stripeCustomerId: customer.id,
        },
      });
    }

    const prices = await this.stripe.prices.list({
      expand: ['data.product'],
    });
    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      billing_address_collection: 'auto',
      line_items: [
        {
          price: prices.data[0].id,
          // For usage-based billing, don't pass quantity
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    });
    console.log(session.url);
    return session.url;
  }

  async createPortalSession(sessionId: string) {
    const checkoutSession =
      await this.stripe.checkout.sessions.retrieve(sessionId);
    const returnUrl = process.env.FRONTEND_URL!;
    if (
      !checkoutSession.customer ||
      typeof checkoutSession.customer !== 'string'
    ) {
      throw new Error('Customer not found or invalid');
    }
    const portalSession = await this.stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });
    return portalSession.url;
  }

  async webhook(rawBody: Buffer, signature: string) {
    const endpointSecret =
      'whsec_34b35c07fe1f1ee2fcfd3ad4f0a09c083fe7e75ad6cdbb43fdaf8746134fa79a';
    const event = this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      endpointSecret,
    );
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.trial_will_end':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subwscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case 'customer.subscription.deleted':
        subscription = event.data.object;
        status = subscription.status;
        // console.log(`Subscription status is ${status}.`);
        await this.handleSubscriptionDeleted(subscription);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case 'customer.subscription.created':
        subscription = event.data.object;
        status = subscription.status;
        await this.handleSubscriptionCreated(subscription);
        // console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case 'customer.subscription.updated':
        subscription = event.data.object;
        status = subscription.status;
        await this.handleSubscriptionUpdated(subscription);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      case 'entitlements.active_entitlement_summary.updated':
        subscription = event.data.object;
        console.log(`Active entitlement summary updated for ${subscription}.`);
        // Then define and call a method to handle active entitlement summary updated
        // handleEntitlementUpdated(subscription);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
  }
}
