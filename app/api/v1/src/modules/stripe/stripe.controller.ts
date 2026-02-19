import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Param,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';
import type { Request, Response } from 'express';
@Controller('stripe')
export class StripeController {
  private stripe: Stripe;
  constructor(private readonly stripeService: StripeService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  @Post()
  async createProduct() {
    await this.stripeService.createProduct();
  }
  @Get()
  @Redirect()
  async createCheckoutSession(@Body() lookupKey: any) {
    const result = await this.stripeService.createCheckoutSession(lookupKey);
    return {
      url: result,
    };
  }
  @Get(':sessionId')
  @Redirect()
  async createPortalSession(@Param('sessionId') sessionId: string) {
    const res = await this.stripeService.createPortalSession(sessionId);
    return {
      url: res,
    };
  }
  @Post('webhook')
  async webhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    await this.stripeService.webhook(req.body, signature);
    res.sendStatus(200);
  }
}
