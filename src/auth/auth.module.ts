import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './application/services/token.service';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: 'secret'
        }),
    ],
    providers: [
        TokenService
    ],
    exports: [
        TokenService
    ]
})
export class AuthModule { }