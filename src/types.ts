import {Request, Response, NextFunction} from "express";
import {AnyZodObject} from "zod"

export type MiddleWareProps = {
    req: Request,
    res: Response,
    next: NextFunction
}

export type RouteFunctionProps = {
    req: Request,
    res: Response,
}
export type ZodSchemaProps = {
    
    schema: AnyZodObject
}