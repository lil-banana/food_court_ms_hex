export const USERS_SERVICE_PORT = 'USERS_SERVICE_PORT';

export interface UsersServicePort {
    checkOwnerUser(userId: string): Promise<boolean>;
}