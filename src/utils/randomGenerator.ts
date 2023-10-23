import crypto from "crypto";

export default function randomGenerator (length:number) {
    return crypto.randomBytes(length).toString('hex');
}