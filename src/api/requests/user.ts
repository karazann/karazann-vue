export interface ISignInRequest {
    email: string
    password: string
}

export interface ISignUpRequest extends ISignInRequest {
    firstName: string
    lastName: string
}
