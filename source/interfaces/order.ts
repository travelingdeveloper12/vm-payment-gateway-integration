import { Document } from 'mongoose';

export default interface IOrder extends Document {
    name: string, 
    currency: string, 
    price: Number,
    paymentJson:  { intent: { type: String, required: true},
    payer: { payment_method: {type: String, required: true} },
    transactions: [{
     item_list: {
         items:[{
                 name: {type: String},
                 sku: {type: String},
                 price: {type: Number},
                 currency:{type: String},
                 quantity: {type: Number}
         }]
     },
     amount:{
         currency: {type: String, required: true},
         total: {type: Number, required: true}
     }
    }]
}
}
// payment: {
//    id: {type: String},
// intent: {type: String},
// state: {type: String},
// cart: {type: String},
// payer: {
//     payment_method: {type: String},
//     status: {type: String},
//     payer_info: {
//         email: {type: String},
//         first_name: {type: String},
//         last_name: {type: String},
//         payer_id: {type: String},
//         shipping_address:{
//             recipient_name:{type: String},
//             line1:{type: String},
//             city:{type: String},
//             state:{type: String},
//             postal_code:{type: String},
//             country_code:{type: String}
//         },
//         country_code:{type: String}
//     }
// },
// transactions:[
//     {
//        amount:{
//           total:{type: String},
//           currency:{type: String},
//           details:{
//              subtotal:{type: String},
//              shipping:{type: String},
//              insurance:{type: String},
//              handling_fee:{type: String},
//              shipping_discount:{type: String},
//              discount:{type: String}
//           }
//        },
//        payee:{
//           merchant_id:{type: String},
//           email:{type: String}
//        },
//        description:{type: String},
//        item_list:{
//           items:[
//              {
//                 name:{type: String},
//                 sku:{type: String},
//                 price:{type: String},
//                 currency:{type: String},
//                 tax:{type: String},
//                 quantity:{type: Number},
//              }
//           ],
//           shipping_address:{
//              recipient_name:{type: String},
//              line1:{type: String},
//              city:{type: String},
//              state:{type: String},
//              postal_code:{type: String},
//              country_code:{type: String}
//           }
//        },
//        related_resources:[
//           {
//              sale:{
//                 id:{type: String},
//                 state:{type: String},
//                 amount:{
//                    total:{type: String},
//                    currency:{type: String},
//                    details:{
//                       subtotal:{type: String},
//                       shipping:{type: String},
//                       insurance:{type: String},
//                       handling_fee:{type: String},
//                       shipping_discount:{type: String},
//                       discount:{type: String}
//                    }
//                 },
//                 payment_mode:{type: String},
//                 protection_eligibility:{type: String},
//                 protection_eligibility_type:{type: String},
//                 transaction_fee:{
//                    value:{type: String},
//                    currency:{type: String}
//                 },
//                 parent_payment:{type: String},
//                 create_time:{type: String},
//                 update_time:{type: String}
//              }
//           }
//        ]
//     }
//  ]
// }
