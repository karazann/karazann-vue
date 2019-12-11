import Vue from 'vue'
import { ValidationError } from '@bit/szkabaroli.karazann-shared.validator'

interface VueData {
    errors: {
        [key: string]: ValidationError[]
    }
}

export const formError = Vue.extend({
    data(): VueData {
        return {
            errors: {}
        }
    },
    methods: {
        clear(field: string) {
            if (this.errors[field]) delete this.errors[field]
        },
        clearAll() { 
            this.errors = {}
        },
        addErrors(errors: ValidationError[]) {
            errors.forEach((error: ValidationError) => {
                this.addError(error)
            })
        },
        addError(error: ValidationError) {
            if (this.errors[error.property]) {
                this.errors[error.property].push(error)
            } else {
                this.errors[error.property] = []
                this.errors[error.property].push(error)
            }
        },
        getError(field: string) {
            return this.errors[field] ? this.errors[field][0].message : undefined
        }
    }
})
