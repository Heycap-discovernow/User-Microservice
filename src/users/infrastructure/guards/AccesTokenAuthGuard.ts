// src/guards/access-token-auth.guard.ts
import { JWT_KEY } from 'src/config/index';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AccessTokenAuthGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const accessToken = request.headers.authorization?.split(" ")[1];
        if (!accessToken) {
            throw new UnauthorizedException('Access token missing');
        }

        try {
            jwt.verify(accessToken, JWT_KEY as string);
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid access token');
        }
    }
}