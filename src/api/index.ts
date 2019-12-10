import { ISignUpUserRequest, ISignInUserRequest, APIErrorResponse, ICurrentUser } from '@bit/szkabaroli.karazann-shared.interfaces'
import axios from 'axios'

const baseUrl = 'http://localhost:8080'

axios.defaults.baseURL = baseUrl

export interface APIError {
    success: false
    message: string
    name: string
}

export async function postJSON<T>(url: string, data: any): Promise<T> {
    const res = await axios.post(url, data)
    return res.data as T
}

export const signUpInternal = async (firstName: string, lastName: string, email: string, password: string) => {
    const data: ISignUpUserRequest = {
        lastName,
        firstName,
        email,
        username: '',
        password
    }

    return await postJSON<ICurrentUser>('/user/signup', data)
}

export const signInInternal = async (identifier: string, password: string) => {
    const data: ISignInUserRequest = {
        identifier,
        password
    }

    return await postJSON<ICurrentUser>('/user/signin', data)
}
