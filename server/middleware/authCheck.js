import jwt from 'jsonwebtoken';
import users from '../models/users';

class Authenticator {
    static userAuth ( req, res, next) {
        //const token = req.header.jwt;
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify( token, "secret" ); {
             if (!decoded) {
                    return res.status(400).json({
                    error: "invalid token"
                });
            }
           next();
        }
    }
}

export default Authenticator;