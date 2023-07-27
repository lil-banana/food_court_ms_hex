import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenService } from '../../../application/services/token.service';

@Injectable()
export class ClientGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return false;
        }

        try {
            const payload = await this.tokenService.verifyToken(token);
            if (!payload?.role) {
                return false;
            }
            if (payload.role !== 'client') {
                return false
            }
            request['user'] = payload;
            return true;
        } catch (error) {
            return false;
        }
    }
}