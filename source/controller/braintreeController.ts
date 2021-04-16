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
    // Use your own credentials from the sandbox Control Panel here
    merchantId: braintreeConfig.braintree.merchantId,
    publicKey: braintreeConfig.braintree.publicKey,
    privateKey: braintreeConfig.braintree.privateKey
});
  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  const newTransaction = gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
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

