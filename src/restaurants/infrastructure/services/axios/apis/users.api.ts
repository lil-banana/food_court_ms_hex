import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { UserDto } from "../dtos/user.dto";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";

@Injectable()
export class UsersApi {
    constructor(private readonly httpService: HttpService) { }

    getUser(userId: string): Observable<AxiosResponse<UserDto>> {
        return this.httpService.get('http://localhost:3000/users/' + userId);
    }
}