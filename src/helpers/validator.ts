import { plainToClass } from 'class-transformer'
import { Validator, ValidationError } from '@bit/szkabaroli.karazann-shared.validator'

type ClassType<T> = new (...args: unknown[]) => T

interface IRequest { 
    [key: string]: unknown
}

export const validate = <T>(type: ClassType<T>, body: IRequest) => { 
    const input = plainToClass(type, body)
    const errors = Validator.validate(input)
    return errors
}

export const mapError = (errors: ValidationError[], name: string) => {
    const fieldError: any = errors.find((e: { property: any }) => e.property === name)
    return fieldError ? fieldError.message : undefined
}