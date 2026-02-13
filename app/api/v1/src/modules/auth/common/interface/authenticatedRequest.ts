import { Request } from 'express';
import { UserType } from 'src/generated/prisma/enums';
export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    type: UserType;
  };
}
