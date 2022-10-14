import {Router} from 'express';
// import asyncHandler from 'express-async-handler';
// import { HTTP_BAD_REQUEST } from '../constants/http_status';
// import { OrderStatus } from '../constants/order_status';
// import { OrderModel } from '../models/order.model';
// import auth from '../middlewares/auth.mid';
import { createOrder, getTracking } from '../controllers/orderControllers'

const router = Router();

// router.use(auth);

router.post('/create', createOrder)



// router.get('/newOrderForCurrentUser', asyncHandler( async (req:any,res ) => {
//     const order= await getNewOrderForCurrentUser(req);
//     if(order) res.send(order);
//     else res.status(HTTP_BAD_REQUEST).send();
// }))


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

router.get('/track/:id', getTracking)

export default router;
