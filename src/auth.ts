import { verify } from "hono/jwt";
import bcrypt from "bcryptjs";

const secretKey = "fortniteNiggaBalls";

export const verifyToken = (token: string ) => {
    try{
        return verify(token, secretKey);
    } catch (error) {
        return null;
    }
};

export const hashPassword = (password : string) => {
    return bcrypt.hashSync(password, 8);
};

export const comparePassword = (password: string, hashPassword: string) => {
    return bcrypt.compareSync(password, hashPassword);
};
