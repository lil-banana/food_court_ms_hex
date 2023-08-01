import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, BadRequestException, ForbiddenException } from '@nestjs/common';
import { AlreadyHasActiveOrderException } from '../../../application/exceptions/alreadyHasActiveOrder.exception';
import { DishAndRestaurantDoNotMatchException } from '../../../application/exceptions/dishAndRestaurantDoNotMatch.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        
        console.error(exception);

        if (exception instanceof BadRequestException) {
            status = HttpStatus.BAD_REQUEST;
            message = (exception.getResponse() as any).message;
            if (Array.isArray(message)) {
                message = message.join(', ');
            }
        } else if (exception instanceof ForbiddenException) {
            status = HttpStatus.FORBIDDEN;
            message = 'Forbidden resource';
        } else if (exception instanceof AlreadyHasActiveOrderException) {
            status = HttpStatus.CONFLICT;
            message = 'User already has an order in progress';
        } else if (exception instanceof DishAndRestaurantDoNotMatchException) {
            status = HttpStatus.NOT_FOUND;
            message = 'The dish provided does not belong to the restaurant';
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message
        });
    }
}
