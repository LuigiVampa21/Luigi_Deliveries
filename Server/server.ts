import dotenv from 'dotenv';
dotenv.config();
import path from 'path'
import express from "express"
import cors  from "cors"
import  foodRouter  from './src/routes/food.router'
import  userRouter  from './src/routes/user.router'
import  orderRouter  from './src/routes/order.router'

const app = express();

app.use(cors({
    credentials: true,
    origin:['http://localhost:4200']
}))

app.use('/api/foods', foodRouter)
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server is listenning on port: ${port}`);

})