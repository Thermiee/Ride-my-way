import express from 'express';
import Users from '../controllers/userController';
import UserValidate from '../middleware/userCheck';
import Authenticator from '../middleware/authCheck';
import Requests from '../controllers/requestController';

const router = express.Router();

const { UserSignIn } = Users;
const { loginValidator } = UserValidate;
const { UserSignUp } = Users;
const { AllUsers } = Users;
const { userAuth } = Authenticator;
const { UserAllRequest } = Requests;
const { UserSingleRequest } = Requests;

router.post('/users/signin', loginValidator, UserSignIn);
router.post('/users/signup', UserSignUp);
router.get('/users', AllUsers);

router.get('/users/requests', userAuth, UserAllRequest);
router.get('/users/requests/:requestId', userAuth, UserSingleRequest);
// router.get( '/users/requests/:requestId', userAuth, UserSingleRequest)

export default router;