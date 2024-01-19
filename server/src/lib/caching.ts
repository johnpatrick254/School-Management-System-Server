import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

export class CustomCacheInterceptor extends CacheInterceptor {
  protected isRequestCacheable(context: ExecutionContext): boolean {
    const http = context.switchToHttp();
    const request = http.getRequest();

    const ignoreCaching: boolean = this.reflector.get(
      'ignoreCaching',
      context.getHandler(),
    );

    return !ignoreCaching || request.method === 'GET';
  }
}

export const NoCache = () => SetMetadata('ignoreCaching', true);
