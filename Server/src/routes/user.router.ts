import { Router } from 'express';
import { sample_users } from '../mock-data';
import jwt from "jsonwebtoken";
import { UserModel } from '../models/user.model';

const router = Router();

router.post('/login', async (req,res) => {
    const { email,password } = req.body;
    const user = await UserModel.findOne({email})
    if(user){
        const token = generateTokenReponse(user)
        res.send({
            user,
            token
        })
    }
    res.status(200).send('Wrong data')

})

const generateTokenReponse = (user : any) => {
    return jwt.sign({
      email:user.email, isAdmin: user.isAdmin
    },process.env.JWT_SECRET!,{
      expiresIn:"30d"
    });
}


export default router;






















function asyncHandler(arg0: (req: any, res: any) => Promise<void>): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
  throw new Error('Function not implemented.');
}
// import { getSeed, login, register } from '../controllers/userController'

// router.get("/seed", getSeed)
// router.post("/login", login)
// router.post('/register', register)