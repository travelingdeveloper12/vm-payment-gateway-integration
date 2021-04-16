import dotenv from 'dotenv';

dotenv.config();

const MONGO_CONFIG = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'vamstaruser';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'vamstarpassword';
const MONGO_HOSTNAME = process.env.MONGO_URL || 'vammongo.acptm.mongodb.net/vamstar?retryWrites=true&w=majority';

const MONGO = {
    host: MONGO_HOSTNAME,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_CONFIG,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}`
};


const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

//VAMSTAR-NEXT
const PAYPAL_CONFIGURATION_MODE = process.env.PAYPAL_MODE || 'sandbox';
const PAYPAL_CONFIGURATION_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'Ae7p1BFaHmHnHjS85AsPlgJQjPrnhy3xXxCmqoi23vrOZB_uyrNrT8ONt8K6KT9uCJ-WJ2S9nFjljGjf';
const PAYPAL_CONFIGURATION_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || 'EGAbJ9MMJFBTRtmdqQ9ntbQ_gN_AMkSiQgt0mOXCuFcygICzlbUFj5i5d0-s41hRFBJeCMDV0ZHkvxMR';

const PAYPAL_CONFIG ={
    mode: PAYPAL_CONFIGURATION_MODE,
    client_id: PAYPAL_CONFIGURATION_CLIENT_ID,
    client_secret: PAYPAL_CONFIGURATION_CLIENT_SECRET
}

/** VAMSTAR BRAINTREE CONFIGURATION*/ 
const BRAINTREE_CONFIGURATION_SANDBOX_AUTHORIZATION = process.env.BRAINTREE_AUTHORIZATION_ID || 'sandbox_4x44zpms_rsqzpcd6v2h36k2b';
const BRAINTREE_CONFIGURATION_MECRCHANT_ID = process.env.BRAINTREE_MECRCHANT_ID || 'rsqzpcd6v2h36k2b';
const BRAINTREE_CONFIGURATION_PUBLIC_KEY = process.env.BRAINTREE_PUBLIC_KEY ||  'gvxpq4rmjvnxgfhf';
const BRAINTREE_CONFIGURATION_PRIVATE_KEY = process.env.BRAINTREE_PRIVATE_KEY || 'a386e6e2ad82db2b0ee6be7b125fd6a7';

const BRAINTREE_CONFIG = {
    authorization: BRAINTREE_CONFIGURATION_SANDBOX_AUTHORIZATION,
    merchantId: BRAINTREE_CONFIGURATION_MECRCHANT_ID,
    publicKey: BRAINTREE_CONFIGURATION_PUBLIC_KEY,
    privateKey: BRAINTREE_CONFIGURATION_PRIVATE_KEY
}

const config = {
    mongo: MONGO,
    server: SERVER,
    paypal: PAYPAL_CONFIG,
    braintree: BRAINTREE_CONFIG
}

export default config;