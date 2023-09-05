import { SetMetadata } from '@nestjs/common';

export const IsAllowed = (...args: string[]) => SetMetadata('roles', args);
