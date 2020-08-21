export interface Credentials {
    username: string;
    password: string;
    grant_type: string;
}
export interface AuthenticationResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    UserName: string;
    Role: string;
    userid: number;
    selectedOutlet: string;
    '.expires': Date;
}

export interface UserCredentials {
    userid: number;
    oldPassword: string;
    newPassword: string;
}
export interface ResetCredentials {
    userId: number;
    Password: string;
}
