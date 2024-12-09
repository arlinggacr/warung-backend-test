import { MethodLogger } from '@app/common/util/method-logger';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Observable, map } from 'rxjs';

interface ResponseSchema<T> {
  success: boolean;
  statusCode: number;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseSchema<T>>
{
  logger: Logger;

  constructor() {
    this.logger = new Logger(ResponseInterceptor.name);
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseSchema<T>> {
    this.logger.log(MethodLogger.Service('Execute ResponseInterceptor'));
    const response = context.switchToHttp().getResponse<FastifyReply>();
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        statusCode: response.statusCode,
      })),
    );
  }
}
