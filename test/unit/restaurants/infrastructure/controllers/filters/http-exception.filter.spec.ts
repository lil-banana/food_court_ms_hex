import { BadRequestException, ForbiddenException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from '../../../../../../src/restaurants/infrastructure/controllers/filters/http-exception.filter';
import { InvalidArgumentError } from '../../../../../../src/restaurants/domain/exceptions/invalidArgumentError.exception';
import { UserIsNotOwnerException } from '../../../../../../src/restaurants/application/exceptions/userIsNotOwner.exception';
import { ServiceUnabailableException } from '../../../../../../src/restaurants/infrastructure/exceptions/serviceUnavailableException.exception';

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
    
        it('should handle UserIsNotOwnerException exception', () => {
            const expectedMessage = 'The userId given does not belong to an owner';
            const exception = new UserIsNotOwnerException(expectedMessage);
            const expectedStatus = HttpStatus.BAD_REQUEST;
    
            httpExceptionFilter.catch(exception, host);
    
            expect(response.status).toHaveBeenCalledWith(expectedStatus);
            expect(response.json).toHaveBeenCalledWith({
                statusCode: expectedStatus,
                timestamp: expect.any(String),
                message: expectedMessage
            });
        });
    
        it('should handle ServiceUnabailableException exception', () => {
            const expectedMessage = 'Did not recieve a response from Users ms';
            const exception = new ServiceUnabailableException(expectedMessage);
            const expectedStatus = HttpStatus.SERVICE_UNAVAILABLE;
    
            httpExceptionFilter.catch(exception, host);
    
            expect(response.status).toHaveBeenCalledWith(expectedStatus);
            expect(response.json).toHaveBeenCalledWith({
                statusCode: expectedStatus,
                timestamp: expect.any(String),
                message: expectedMessage
            });
        });

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