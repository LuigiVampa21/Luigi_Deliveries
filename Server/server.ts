import dotenv from 'dotenv';
dotenv.config();
import path from 'path'
import express from "express"
import cors  from "cors"
import  foodRouter  from './src/routes/food.router'
import  userRouter  from './src/routes/user.router'
import  orderRouter  from './src/routes/order.router'
import { sample_foods, sample_tags, sample_users } from './src/mock-data';
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json())
app.use(cors({
    credentials: true,
    origin:['http://localhost:4200']
}))


app.get("/api", (req,res) => {
    res.end('hello')
})

app.get('/api/foods', (req,res) => {
    res.send(sample_foods)
})

app.get('/api/foods/search/:searchTerm', (req,res) => {
    const { searchTerm } = req.params;
    const foods = sample_foods.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods)
})


app.get('/api/foods/tags', (req,res) => {
    res.send(sample_tags)
})

app.get('/api/foods/tags/:tagName', (req,res) => {
    const { tagName } = req.params;
    const foods = sample_foods.filter(f => f.tags?.includes(tagName));
    res.send(foods)
})

app.get('/api/foods/:foodID', (req,res) => {
    const { foodID } = req.params;
    const food = sample_foods.filter(f => f.id === foodID);
    res.send(food)
})

app.post('/api/users/login', (req,res) => {
    const { email,password } = req.body;
    const user = sample_users.find(user => user.email === email && user.password === password);
    if(user){
        const token = generateTokenReponse(user)
        user.token = token
        res.send('Successful'+ token)
    }
    res.send('Wrong data')

})

const generateTokenReponse = (user : any) => {
    return jwt.sign({
      email:user.email, isAdmin: user.isAdmin
    },process.env.JWT_SECRET!,{
      expiresIn:"30d"
    });
}








// app.use("/foods", foodRouter)
// app.use("/users", userRouter);
// app.use("/orders", orderRouter);

// app.use(express.static('public'));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname,'public', 'index.html'))
// })

const port = 5000;
app.listen(port, () => {
    console.log(`Server is listenning on port: ${port}`);

})