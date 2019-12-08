import axios from 'axios'
import { ISignInRequest, ISignUpRequest } from './requests/user'

const baseUrl = 'http://localhost:8080'

axios.defaults.baseURL = baseUrl
axios.defaults.timeout = 4000

export const signUpInternal = async (firstName: string, lastName: string, email: string, password: string) => {
    const data: ISignUpRequest = {
        lastName,
        firstName,
        email,
        password
    }

    return await axios.post('/user/signup', data)
}

export const signInInternal = async (email: string, password: string) => {
    const data: ISignInRequest = {
        email,
        password
    }
    
    return await axios.post('/user/signin', data)
}
