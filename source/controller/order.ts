import {Request, Response, NextFunction} from 'express';
import logging from '../config/logging';
import pay from '../config/config';
import mongoose from 'mongoose';
import Order from '../models/order'

const paypal = require('paypal-rest-sdk');

const NAMESPACE = 'ORDER CONTROLLER';

/** PayPal Configuration*/
paypal.configure({
    'mode': pay.paypal.mode, 
    'client_id': pay.paypal.client_id,
    'client_secret': pay.paypal.client_secret
  });


const getIndexPage = (req: Request, res: Response, next: NextFunction) => {
res.render('index');
};

const createOrder = (req: Request, res: Response, next: NextFunction) =>{
    logging.info(NAMESPACE,` PLACE ORDER `);
   // let{name, currency, price} = req.body;
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:1337/order/success",
            "cancel_url": "http://localhost:1337/order/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "ESP LTD50 Guitar",
                    "sku": "101",
                    "price": req.body.price,
                    "currency": req.body.currency,
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": req.body.currency,
                "total": req.body.price
            },
            "description": "This is a Electric Instrument Payment"
        }]
    };
    //let paymentJson = create_payment_json;
    paypal.payment.create(create_payment_json, function(error: any, payment: any){
        if (error) {
                    throw error;
                } else {
                    console.log("Create Payment Response");
                     console.log(payment);
                    for(let i = 0; i < payment.links.length; i++){
                        if(payment.links[i].rel === 'approval_url'){
                                res.redirect(payment.links[i].href);
                        }
                    }
                }
    });
};

const getPaymentSuccess = (req: Request, res: Response, next: NextFunction) =>{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_payment_json ={
        "payer_id":payerId,
        "transactions": [{
            "amount": {
                         "currency": "USD",
                         "total":"20.00"
}
}]
}
paypal.payment.execute(paymentId, execute_payment_json, function(error: any, payment: any){
    if(error){
        console.log(error)
         throw error;
         }
else{
    console.log("Get Payment Response!1")
    console.log(JSON.stringify(payment));
    res.send('Success');
}
});
};



// const getPaymentSuccessParams = (req: Request, res: Response, next: NextFunction) =>{
// const payerId = req.query.PayerID;
// const paymentId = req.query.paymentId;
// const execute_payment_json={
// "payer_id":payerId,
// "transactions": [{
//     "amount": {
//         "currency": "USD",
//         "total":"20.00"
//     }
// }]
// };

// paypal.payment.execute(paymentId, execute_payment_json, function(error: any, payment: any){
// if(error){
// throw error;
// }
// else{
// console.log("Getting Payment Response!");
// console.log(JSON.stringify(payment));
// res.send('Success');
// }});
// };

const getCancelledPaymentPage = (req: Request, res: Response, next: NextFunction) =>{
res.send('Payment Cancelled');
};

const getOrder = (req: Request, res: Response, next: NextFunction) =>{

    Order.find().exec().then((results) =>{
        return res.status(200).json({
            orders: results,
            count: results.length
        });
    })
    .catch((error)=>{
        return res.status(500).json({
            message: error.message, error
        });
    });
};


const checkApi = (req: Request, res: Response, next: NextFunction) =>{
    return res.status(200).json({
            message: 'Test-Check-API'
    });
}

export default {getIndexPage,createOrder,getPaymentSuccess,getCancelledPaymentPage,checkApi,getOrder};