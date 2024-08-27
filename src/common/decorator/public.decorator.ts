import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'public';
export const Public = (isPublic = true) => SetMetadata(IS_PUBLIC_KEY, isPublic);
