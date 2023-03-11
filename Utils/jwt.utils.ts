import jwt from "jsonwebtoken";
import Config from "../Config/DB.config";

//Se crea un token en base id del usuario,
function createdAccessToken(user: any) {
    const expireToken = new Date();
    expireToken.setHours(expireToken.getHours() + 3);

    const payload = {
        token_type: "access",
        user_id: user._id,
        iat: Date.now(),
        exp: expireToken.getTime(),
    };

    return jwt.sign(payload, Config.JWT_SECRET_KEY);
}

function createRefreshToken(user: any){

    const expireToken = new Date();
    expireToken.setMonth(expireToken.getMonth() + 1)

    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Date.now(),
        exp: expireToken.getTime(),
    };
    
    return jwt.sign(payload, Config.JWT_SECRET_KEY);
}

function decoder(token: any) {

    var decode = jwt.verify(token, Config.JWT_SECRET_KEY)
    return  decode;
}

export {
    createRefreshToken,
    createdAccessToken,
    decoder,
};