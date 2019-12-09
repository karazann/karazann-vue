export interface ISignInRequest {
    identifier: string
    password: string
}

export interface ISignUpRequest {
    email: string
    username: string
    firstName: string
    lastName: string
    password: string
}