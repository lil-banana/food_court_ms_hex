import { Injectable } from "@nestjs/common";
import { UsersServicePort } from "../../../domain/services/user.service";
import { UsersApi } from "./apis/users.api";
import { UserDto } from "./dtos/user.dto";
import { AxiosResponse } from "axios";
import { firstValueFrom } from 'rxjs';
import { ServiceUnabailableException } from "../../exceptions/serviceUnavailableException.exception";

@Injectable()
export class UsersService implements UsersServicePort {
    constructor(
        private readonly usersApi: UsersApi
    ) { }

    async checkOwnerUser(userId: string): Promise<boolean> {
        try {
            const response: AxiosResponse<UserDto> = await firstValueFrom(this.usersApi.getUser(userId));
            const user: UserDto = response.data;
            return user.role.name === 'owner';
        } catch (e) {
            if (e.response) {
                console.error('Server responded with an error:', e.response.status, e.response.data);
            } else if (e.request) {
                console.error('No response received from the server');
                throw new ServiceUnabailableException('Did not recieve a response from Users ms');
            } else {
                console.error('Error setting up the request:', e.message);
            }
            throw e;
        }
    }
}