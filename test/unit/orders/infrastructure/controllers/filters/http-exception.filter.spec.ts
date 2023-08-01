import { BadRequestException, ForbiddenException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from '../../../../../../src/orders/infrastructure/controllers/filters/http-exception.filter';
import { AlreadyHasActiveOrderException } from '../../../../../../src/orders/application/exceptions/alreadyHasActiveOrder.exception';
import { DishAndRestaurantDoNotMatchException } from '../../../../../../src/orders/application/exceptions/dishAndRestaurantDoNotMatch.exception';

describe('Http Exception Filter', () => {
    let httpExceptionFilter: HttpExceptionFilter;
    let host: any;
    let response: any;

    beforeEach(() => {
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        host = {
            switchToHttp: jest.fn().mockReturnThis(),
            getResponse: jest.fn().mockReturnValue(response),
        };
        httpExceptionFilter = new HttpExceptionFilter();
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    describe('Success', () => {
        it('should handle BadRequestException', () => {
            const expectedMessage = 'Bad request message';
            const exception = new BadRequestException([expectedMessage]);
            const expectedStatus = HttpStatus.BAD_REQUEST;

            httpExceptionFilter.catch(exception, host);

            expect(response.status).toHaveBeenCalledWith(expectedStatus);
            expect(response.json).toHaveBeenCalledWith({
                statusCode: expectedStatus,
                timestamp: expect.any(String),
                message: expectedMessage
            });
        });

        it('should handle ForbiddenException', () => {
            const expectedMessage = 'Forbidden resource';
            const exception = new ForbiddenException('message');
            const expectedStatus = HttpStatus.FORBIDDEN;

            httpExceptionFilter.catch(exception, host);

            expect(response.status).toHaveBeenCalledWith(expectedStatus);
            expect(response.json).toHaveBeenCalledWith({
                statusCode: expectedStatus,
                timestamp: expect.any(String),
                message: expectedMessage
            });
        });

        it('should handle AlreadyHasActiveOrderException exception', () => {
            const expectedMessage = 'User already has an order in progress';
            const exception = new AlreadyHasActiveOrderException(expectedMessage);
            const expectedStatus = HttpStatus.CONFLICT;
    
            httpExceptionFilter.catch(exception, host);
    
            expect(response.status).toHaveBeenCalledWith(expectedStatus);
            expect(response.json).toHaveBeenCalledWith({
                statusCode: expectedStatus,
                timestamp: expect.any(String),
                message: expectedMessage
            });
        });
    
        it('should handle DishAndRestaurantDoNotMatchException exception', () => {
            const expectedMessage = 'The dish provided does not belong to the restaurant';
            const exception = new DishAndRestaurantDoNotMatchException(expectedMessage);
            const expectedStatus = HttpStatus.NOT_FOUND;
    
            httpExceptionFilter.catch(exception, host);
    
            expect(response.status).toHaveBeenCalledWith(expectedStatus);
            expect(response.json).toHaveBeenCalledWith({
                statusCode: expectedStatus,
                timestamp: expect.any(String),
                message: expectedMessage
            });
        });
    
        it('should handle unknown exception', () => {
            const exception = new Error();
            const expectedStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            const expectedMessage = 'Internal server error';
    
            httpExceptionFilter.catch(exception, host);
    
            expect(response.status).toHaveBeenCalledWith(expectedStatus);
            expect(response.json).toHaveBeenCalledWith({
                statusCode: expectedStatus,
                timestamp: expect.any(String),
                message: expectedMessage
            });
        });
    });
});