import { SetMetadata } from '@nestjs/common';

export const Authorization = (...args: string[]) => SetMetadata('roles', args);
