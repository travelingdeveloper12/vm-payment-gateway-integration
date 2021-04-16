import express from 'express';
import controller from '../controller/order'
const router = express.Router();

//PayPal
router.get('/', controller.getIndexPage );
router.get('/check',controller.checkApi);
router.post('/create', controller.createOrder);
router.get('/success', controller.getPaymentSuccess);
router.get('/cancel',controller.getCancelledPaymentPage);
router.get('/get', controller.getOrder);
export = router;