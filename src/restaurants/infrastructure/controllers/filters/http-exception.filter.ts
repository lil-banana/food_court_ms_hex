import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { InvalidArgumentError } from '../../../domain/exceptions/invalidArgumentError.exception';
import { UserIsNotOwnerException } from '../../../application/exceptions/userIsNotOwner.exception';
import { ServiceUnabailableException } from '../../exceptions/serviceUnavailableException.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof InvalidArgumentError || exception instanceof UserIsNotOwnerException) {
            status = HttpStatus.BAD_REQUEST;
            message = exception.message;
        } else if (exception instanceof ServiceUnabailableException) {
            status = HttpStatus.SERVICE_UNAVAILABLE;
            message = exception.message;
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message
        });
    }
}
