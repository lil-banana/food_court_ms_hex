import { HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from '../../../../../../src/dishes/infrastructure/controllers/filters/http-exception.filter';
import { InvalidArgumentError } from '../../../../../../src/dishes/domain/exceptions/invalidArgumentError.exception';
import { DishNotFoundException } from '../../../../../../src/dishes/infrastructure/exceptions/dishNotFound.exception';

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
    });

    describe('Success', () => {
        it('should handle InvalidArgumentError exception', () => {
            const expectedMessage = 'Invalid argument';
            const exception = new InvalidArgumentError(expectedMessage);
            const expectedStatus = HttpStatus.BAD_REQUEST;
    
            httpExceptionFilter.catch(exception, host);
    
            expect(response.status).toHaveBeenCalledWith(expectedStatus);
            expect(response.json).toHaveBeenCalledWith({
                statusCode: expectedStatus,
                timestamp: expect.any(String),
                message: expectedMessage
            });
        });

        it('should handle DishNotFoundException exception', () => {
            const expectedMessage = 'Dish not exists';
            const exception = new DishNotFoundException(expectedMessage);
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