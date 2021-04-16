import http from 'http';
import express from 'express';

import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';

import sampleRoutes from './routes/sample';
import orderRoutes from './routes/order';
import brainTreeRoutes from './routes/braintree';

const NAMESPACE = 'SERVER';

const ejs = require('ejs');
const router = express();

/** VIEW ENGINE SETUP*/
router.set('views', './source/views');
router.set('view engine', 'ejs');

/**For Braintree */
const  cookieParser = require('cookie-parser');
const path = require('path');
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));

/** Mongo Connection*/
mongoose.connect(config.mongo.url, config.mongo.options)
.then( result => {
        logging.info(NAMESPACE, "Connected to MongoDB!!", result);
}).catch((error)=>{
    logging.error(NAMESPACE,error.message,error);
});

/** Logging from the Request*/
router.use((req,res,next) => {

    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', ()=>{
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});

/** Request Parsing*/
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

/** API SECURITY*/
router.use((req, res, next) => {
    res.header('Access-Constrol-Allow-Origin','*');
    res.header('Access-Constrol-Allow-Headers' , 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method == 'OPTIONS'){
        res.header('Access-Constrol-Allow-Methods','GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

/** Routes*/
router.use('/sample',sampleRoutes);
router.use('/order', orderRoutes);
router.use('/braintree', brainTreeRoutes);

/** Error Handling*/
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
            message: error.message
    });
});

router.use((req,res,next) =>{
    const error = new Error('Bad Request');
    return res.status(400).json({
            message: error.message
    });
});

/** Server Creation*/
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () =>{
logging.info(NAMESPACE, `Server is running on ${config.server.hostname}:${config.server.port}`);
});