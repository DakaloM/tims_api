import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.toString().split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN as string, (err, data) => {
      if (err) res.status(403).json({ message: "Invalid Token" });
      //@ts-ignore
      req.user = data;
      next();
    });
  } else {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req);
  verifyToken(req, res, () => {
    //@ts-ignore
    if (req.user.id === req.query.userId || req.user.role === "ADMIN") {
      next();
    } else {
      //@ts-ignore
      res.status(403).json({ message: "Permission Denied!", user: req.user });
    }
  });
};

const verifyTokenAndMarshal = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    //@ts-ignore
    if (req.user.role === "ADMIN" || req.user.role === "MARSHAL" || req.user.role === "supperAccount"
    ) {
      next();
    } else {
      res
        .status(403)
        .json({
          message: "This operation is authorized for marshals and admin only!",
        });
    }
  });
};
const verifyTokenAndOwner = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    //@ts-ignore
    if (req.user.role === "ADMIN" || req.user.role === "OWNER" || req.user.role === "supperAccount"
    ) {
      next();
    } else {
      res
        .status(403)
        .json({
          message: "This operation is authorized for owners and admin only!",
        });
    }
  });
};
const verifyTokenAndDriver = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    //@ts-ignore
    if (req.user.role === "ADMIN" ||eq.user.role === "DRIVER" ||req.user.role === "supperAccount"
    ) {
      next();
    } else {
      res
        .status(403)
        .json({
          message: "This operation is authorized for drivers and admin only!",
        });
    }
  });
};
const verifyTokenAndAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    //@ts-ignore
    if (req.user.role === "ADMIN" || req.user.role === "SUPERUSER" || req.user.role === "supperAccount"
    ) {
      next();
    } else {
      res.status(403).json({ message: "Permission Denied!" });
    }
  });
};

const verifyTokenAndSuperUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    //@ts-ignore
    if (req.user.role === "SUPERUSER") {
      next();
    } else {
      res.status(403).json({ message: "Permission Denied!" });
    }
  });
};
const verifyTokenAndSuperAccount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    //@ts-ignore
    if (req.user.role === "supperAccount") {
      next();
    } else {
      res.status(403).json({ message: "Permission Denied!" });
    }
  });
};

export {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndSuperAccount,
  verifyTokenAndSuperUser,
  verifyTokenAndMarshal,
  verifyTokenAndOwner, 
  verifyTokenAndDriver
};
