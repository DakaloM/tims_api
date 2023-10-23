import {object, string} from "zod"

export const loginSchema = object({
    body: object({
        email: string({
            required_error: "Email address is required",
            invalid_type_error: "Invalid email"
        }).email({message: "Invalid email"}),
        password: string({
            required_error: "Password ios required",
            invalid_type_error: "Invalid password"
        })
    })
})