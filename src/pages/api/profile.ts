import {verify} from 'jsonwebtoken';

export default function profile(req, res) {
    const {myTokenName} = req.cookies;

    if(!myTokenName){
        return res.status(401).json({message:'Invalid token'})
    }
    try {
        const user = verify(myTokenName, 'secret')
    console.log(user);
    return res.status(200).json({email: user.email, username: user.username})
    } catch (error) {
        res.status(401).json({message:'Invalid token'})
    }
  
}
  