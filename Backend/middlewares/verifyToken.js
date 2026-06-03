import jwt from "jsonwebtoken";
import { config } from "dotenv";
const { verify } = jwt;
config();

export const verifyToken = (...allowedRoles) => {

    return async (req, res, next) => {

        // get token from cookies
        const token = req.cookies?.token;

        // check token exists or not
        if (!token) {

            return res.status(401).json({
                message: "Please login first"
            });

        }

        // verify and decode token
        const decodedToken = verify(
            token,
            process.env.SECRET_KEY
        );

        // check role authorization
        if (!allowedRoles.includes(decodedToken.role)) {

            return res.status(403).json({
                message: "You are not authorized"
            });

        }

        // attach decoded user data
        req.user = decodedToken;
        next();

    };

};