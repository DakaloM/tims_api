import {object, string } from "zod";

export const communicationSchema = object({
    body: object({
        communicationId: string({
            required_error: "communicationId is required",
            invalid_type_error: "Enter a valid communicationId",
        }),
        message: string({
            required_error: "message is required",
            invalid_type_error: "Invalid message provided"
        }),
        senderId: string({
            required_error: "senderId required",
            invalid_type_error: "Invalid senderId",
        }), 
       
    })
})