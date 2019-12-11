import { ISignUpUserRequest, ISignInUserRequest, APIErrorResponse, ICurrentUser } from '@bit/szkabaroli.karazann-shared.interfaces'
import axios from 'axios'

const baseUrl = 'http://localhost:8080'

axios.defaults.baseURL = baseUrl

export interface APIError {
    success: false
    message: string
    name: string
}
interface APIResponse<T> {
    data: T
}

export const signInInternal = async (req: ISignInUserRequest) => await axios.post<ICurrentUser>('/user/signin', req)
