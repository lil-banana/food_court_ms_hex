import { TokenService } from '../../../../../src/auth/application/services/token.service';

describe('Token Service', () => {
    let tokenService: TokenService;
    let jwtService: any;

    beforeEach(() => {
        jwtService = {
            signAsync: jest.fn(),
            verifyAsync: jest.fn()
        };
        tokenService = new TokenService(jwtService);
    });

    describe('Success', () => {
        describe('verifyToken', () => {
            it('should verify a token and return payload', async () => {
                const token = 'token';
                const expectedPayload = 'payload';

                jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(expectedPayload);

                const payload: string = await tokenService.verifyToken(token);

                expect(payload).toBe(expectedPayload);
                expect(jwtService.verifyAsync).toHaveBeenCalledWith(token);
            });
        })
    });
});