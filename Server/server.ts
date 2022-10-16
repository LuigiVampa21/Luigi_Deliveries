import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors'
import path from 'path'
import express from "express"
import cors  from "cors"
import { dbConnect } from "./src/DB/db.config"
import  foodRouter  from './src/routes/food.router'
import  userRouter  from './src/routes/user.router'
import  orderRouter  from './src/routes/order.router'
import { sample_foods, sample_tags, sample_users } from './src/mock-data';

const app = express();

app.use(express.json())
app.use(cors({
    credentials: true,
    origin:['http://localhost:4200']
}))


app.get("/api", (req,res) => {
    res.end('hello')
})

app.use("/api/foods", foodRouter)
app.use('/api/users', userRouter)



// app.use("/orders", orderRouter);

// app.use(express.static('public'));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname,'public', 'index.html'))
// })

const port = 5000;
app.listen(port, () => {
    console.log(`Server is listenning on port: ${port}`);
    dbConnect()
})