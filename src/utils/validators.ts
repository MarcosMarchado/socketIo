import emailValidator from 'validator'

export function existsOrError(value: string, msg: string) {
    if (!value) throw msg
}

export function isEmail(value: string, msg: string) {
    if (!emailValidator.isEmail(value)) throw msg
}

export function equalsOrError(valueA: string, valueB: string, msg: string) {
    if (valueA === valueB) throw msg
}
