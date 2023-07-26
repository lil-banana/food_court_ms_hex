import { AdminGuard } from '../../../../../../src/auth/infrastructure/controllers/guards/admin.guard';

describe('Admin Guard', () => {
    let guard: AdminGuard;
    let tokenService: any;
    let context: any;
    let request: any;

    beforeEach(() => {
        tokenService = {
            verifyToken: jest.fn(),
        };
        request = {
            headers: {
                authorization: 'token',
            },
            body: {
            },
        };
        context = {
            switchToHttp: jest.fn().mockReturnThis(),
            getRequest: jest.fn()
        };

        guard = new AdminGuard(tokenService);
    });

    describe('Success', () => {
        it('should return true if the token is valid and contains the "admin" role', async () => {
            jest.spyOn(context, 'getRequest').mockReturnValue(request);
            jest.spyOn(tokenService, 'verifyToken').mockReturnValue({ role: 'admin' });

            const result = await guard.canActivate(context);
            expect(result).toBe(true);
        });
    });

    describe('Failure', () => {
        it('should return false if the request has no token', async () => {
            jest.spyOn(context, 'getRequest').mockReturnValue({headers: {authorization: undefined}});
            
            const result = await guard.canActivate(context);
            expect(result).toBe(false);
        });

        it('should return false if the token has no payload', async () => {
            jest.spyOn(context, 'getRequest').mockReturnValue(request);
            jest.spyOn(tokenService, 'verifyToken').mockReturnValue(undefined);

            const result = await guard.canActivate(context);
            expect(result).toBe(false);
        });

        it('should return false if token payload role is not admin', async () => {
            jest.spyOn(context, 'getRequest').mockReturnValue(request);
            jest.spyOn(tokenService, 'verifyToken').mockReturnValue({role: 'notAdmin'});

            const result = await guard.canActivate(context);
            expect(result).toBe(false);
        });

        it('should return false if it gets an unexpected error', async () => {
            jest.spyOn(context, 'getRequest').mockReturnValue(request);
            jest.spyOn(tokenService, 'verifyToken').mockRejectedValue(new Error());

            const result = await guard.canActivate(context);
            expect(result).toBe(false);
        });
    });

});
