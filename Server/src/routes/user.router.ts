import { Router } from 'express';
import { sample_users } from '../mock-data';
import jwt from "jsonwebtoken";
import { User, UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes';

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
    res.status(StatusCodes.OK).send('Wrong data')

})

router.post('/register', async (req, res) => {
    const {name, email, password, address} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      res.status(StatusCodes.BAD_REQUEST)
      .send('User already exist, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword);
    

    const newUser:User = {
      id:'',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false
    }    

    const finalNewUser = await UserModel.create(newUser);
    const token = generateTokenReponse(newUser);
    res.status(StatusCodes.OK).send({
      finalNewUser,
      token
      })
  }
)

const generateTokenReponse = (user : any) => {
    return jwt.sign({
      email: user.email, isAdmin: user.isAdmin
    },process.env.JWT_SECRET!,{
      expiresIn:"30d"
    });
}


export default router;






















// import { getSeed, login, register } from '../controllers/userController'

// router.get("/seed", getSeed)
// router.post("/login", login)
// router.post('/register', register)