import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rolesMeta = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const req = context.getArgByIndex(0);
    const { roles } = req.user;

    return roles.some((rol) => rolesMeta.includes(rol));
  }
}
