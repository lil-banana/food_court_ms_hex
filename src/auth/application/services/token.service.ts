import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) { }
    
    async verifyToken(token: string): Promise<any> {
        return this.jwtService.verifyAsync(token);
    }
}