import { plainToClass } from 'class-transformer'
import { Validator } from '@bit/szkabaroli.karazann-shared.validator'

type ClassType<T> = new (...args: any[]) => T

export const validate = <T>(type: ClassType<T>, body: any) => { 
    const input = plainToClass(type, body)
    const errors = Validator.validate(input)
    return errors
}

export const mapError = (errors:any,name: string) => {
    const fieldError: any = errors.find((e: { property: any }) => e.property === name)
    return fieldError ? fieldError.message : undefined
}