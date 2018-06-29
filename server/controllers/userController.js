import users from '../models/users';
import jwt from 'jsonwebtoken';


class Users {
    static UserSignIn(req, res) {
        const { email, password } = req.body;

        for (let i = 0; i < users.length; i++) {
            if (email.toLowerCase() == users[i].email.toLowerCase() && password == users[i].password) {
                const token = jwt.sign( { id: users[i].id}, "secret", { expiresIn: "1h" });
            return res.status(200).json({
                message: 'Logged in successfully!',
                token: token,
                error: false
            });
            }
        }
        // if (email === users[1].email && password === users[1].password) {
        //   return res.status(200).json({
        //     message: 'Logged in successfully!',
        //     error: false
        //   });
        // }
        return res.status(404).json({
            message: 'Error logging in',
            error: true
        })
    }
    static AllUsers(req, res) {
        return res.status(200).json({
            users
        })
    }
    static UserSignUp(req, res) {
        const { name, password, email } = req.body;
        users.push ({
            id: users.length + 1,
            name, 
            password, 
            email
        });
        // IdGen += 1;
        return res.status(200).json({
            message: 'Signup succesful!',
            error: false
        });
    }
}
export default Users;

