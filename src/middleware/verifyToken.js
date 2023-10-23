import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
            if(err) res.status(403).json({message: "Invalid Token"});
            // we can retrieve the info hidden in the key
            // We hid the userId and Role in the key
            //@ts-ignore
            req.user = data 
            next();
        });
    }else{
        return res.status(401).json({message: "Authentication failled"})
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    console.log(req)
    verifyToken(req, res, () => {
        if(req.user.id === req.query.userId || req.user.role === "ADMIN"){
            next();
        }else{
            res.status(403).json({message: "Permission Denied!", user: req.user})
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === "ADMIN"){
            next();
        }else{
            res.status(403).json({message: "Permission Denied!"})
        }
    }) 
}

const verifyTokenAndSuperUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === "SUPERUSER"){
            next();
        }else{
            res.status(403).json({message: "Permission Denied!"})
        }
    }) 
}

module.exports = { verifyToken , verifyTokenAndAuthorization, verifyTokenAndAdmin }