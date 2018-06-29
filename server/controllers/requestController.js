import users from '../models/users';
import requests from '../models/requests';
import jwt from 'jsonwebtoken';

export class Requests{

    static UserAllRequest (req, res ) {

        const token = req.headers['x-access-token'];
        const decoded = (jwt.verify( token, "secret").id);
        console.log(decoded);
        const Reqlist = requests.filter(function (request) {
            return request.id === decoded;

          });
        
          console.log(Reqlist);


        if (Reqlist.length <= 1) {
            return res.status(404).json({
                message: 'Sorry, you have not made any request!',
                error: true
            });
        }
        res.status(200).json({
            message: 'Here are the list of your requests',
            ListOfRequest: Reqlist,
            error: false
         })
        }
        static UserSingleRequest (req, res) {
        
        const token = req.headers['x-access-token'];
        const decoded = (jwt.verify( token, "secret").id);
        console.log(decoded);

        // const Reqlist = requests.filter(function (request) {
        //     return request.id === decoded ;

        //   });
        const { requestId } = req.params;
        console.log(requestId);

        for (let i = 0; i < requests.length; i++) {
            console.log(requests[i].requestId);
            console.log(requests[i].id);
        
            if (Number(requestId) === requests[i].requestId && decoded === requests[i].id)  {
                return res.status(200).json({
                    message: 'here is your request information',
                    request: requests[i],
                    error: false
                });
            }
        }
        return res.status(404).json({
            message: 'Sorry, request not found!',
            error: true
        });

    }
}
export default Requests;
