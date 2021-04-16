import express from 'express';
import btcontroller from '../controller/braintreeController'
const router = express.Router();

//Braintree
router.get('/', btcontroller.bthome);
router.post('/checkout', btcontroller.btCheckOut);

export = router;