import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InvalidArgumentError } from '../../../domain/exceptions/invalidArgumentError.exception';
import { DishNotFoundException } from '../../exceptions/dishNotFound.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        
        console.error(exception);

        if (exception instanceof InvalidArgumentError) {
            status = HttpStatus.BAD_REQUEST;
            message = exception.message;
        } else if (exception instanceof DishNotFoundException) {
            status = HttpStatus.NOT_FOUND;
            message = exception.message;
        } else if (exception instanceof BadRequestException) {
            status = HttpStatus.BAD_REQUEST;
            message = (exception.getResponse() as any).message;
            if (Array.isArray(message)) {
                message = message.join(', ');
            }
        } else if (exception instanceof ForbiddenException) {
            status = HttpStatus.FORBIDDEN;
            message = 'Forbidden resource';
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message
        });
    }
}
