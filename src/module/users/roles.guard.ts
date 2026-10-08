import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private jwt: JwtService;

  constructor(private reflector: Reflector) {
    this.jwt = new JwtService({ secret: process.env.JWT_SECRET || 'default_jwt_secret' } as any);
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) throw new UnauthorizedException('Missing Authorization header');

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer')
      throw new UnauthorizedException('Malformed Authorization header');

    const token = parts[1];
    try {
      const payload = this.jwt.verify(token as any) as any;
      req.user = payload;
      if (!requiredRoles.includes(payload.role)) {
        throw new ForbiddenException('Insufficient role');
      }
      return true;
    } catch (err) {
      if (err instanceof ForbiddenException) throw err;
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
