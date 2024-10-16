import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private static readonly GRANT_FAIL_MSG: string = 'Grant validation failed';

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const exceptionMessage =
      exception instanceof Error ? exception.message : null;

    if (
      exceptionMessage != null &&
      exceptionMessage.includes(AllExceptionsFilter.GRANT_FAIL_MSG)
    ) {
      response.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: exceptionMessage,
        exceptionMessage: 'Unauthorized Access',
        success: false,
      });
    } else {
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      response.status(status).json({
        statusCode: status,
        message: exceptionMessage,
        exceptionMessage: 'An Unexpected Error Occurred',
        success: false,
      });
    }
  }
}
