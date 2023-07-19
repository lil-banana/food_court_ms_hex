export class UserDto {
    id: string;
    name: string;
    lastName: string;
    documentNumber: string;
    cellphoneNumber: string;
    birthDay: Date;
    email: string;
    role: {
        name: string,
        description: string
    };
}