import {Request, Response, NextFunction} from 'express';
import logging from '../config/logging';
import braintreeConfig from '../config/config';

const braintree = require('braintree');

const NAMESPACE = 'BRAINTREE CONTROLLER';

const bthome = (req: Request, res: Response, next: NextFunction) => {
  res.render('braintreeindex');
};

const btCheckOut = (req: Request, res: Response, next: NextFunction) =>{
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: braintreeConfig.braintree.merchantId,
    publicKey: braintreeConfig.braintree.publicKey,
    privateKey: braintreeConfig.braintree.privateKey
});
  
  const nonceFromTheClient = req.body.paymentMethodNonce;
  
  const newTransaction = gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  }, (error: any, result: any) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
};

export default {bthome,btCheckOut};

