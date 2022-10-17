import {Router} from 'express';
import { StatusCodes } from 'http-status-codes';
import { OrderStatus } from '../constants/order.status.enum';
import { OrderModel } from '../models/order.model';
import auth from '../middlewares/auth.mid';
// import { createOrder, getTracking } from '../controllers/orderControllers'

const router = Router();

router.use(auth);

router.post('/create', async (req: any,res: any)=>{
    const requestOrder = req.body;
    const { id } = req.user;
    console.log(id);
if(requestOrder.items.length <= 0){
    res.status(StatusCodes.BAD_REQUEST).send('Cart is empty');
    return;
}
    await OrderModel.deleteOne({
        user: id,
        status: OrderStatus.NEW
    })

    const newOrder = new OrderModel({...requestOrder, user: req.user.id})
    await newOrder.save()
    res.send(newOrder)
})


router.get('/newOrderForCurrentUser', async (req:any,res ) => {
    const order= await OrderModel.findOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });
    if(order) res.send(order);
    else res.status(StatusCodes.BAD_REQUEST).send();
})


// router.post('/pay', asyncHandler( async (req:any, res) => {
//     const {paymentId} = req.body;
//     const order = await getNewOrderForCurrentUser(req);
//     if(!order){
//         res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
//         return;
//     }

//     order.paymentId = paymentId;
//     order.status = OrderStatus.PAYED;
//     await order.save();

//     res.send(order._id);
// }))

// router.get('/track/:id', getTracking)

export default router;
