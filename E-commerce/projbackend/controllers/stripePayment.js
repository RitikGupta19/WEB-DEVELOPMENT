// Stripe method for payment

// const stripe = require('stripe')('sk_test_51GpsXkFavV2imROSIYoPPSP2xwjMCShfjN2Ab1Mzm9B8qM7AC8C7Zc9lfPH6CYWOQHG9o0EccEZntId4m1lcIXfV00TnJdg3QK');
// const {v4} = require('uuid');
// const uuid = v4;

// exports.makepayment = (req, res) => {
//     const {token, products} = req.body;
//     console.log('PRODUCTS: ', products);

//     let amount = 0;
//         products.map((product) => {
//             amount = amount + product.price;
//         });

//     const idempotencyKey = uuid();
//     return stripe.customers.create({
//         email: token.email,
//         source: token.id
//     })
//     .then((customer) => {
//         stripe.charges.create({
//             amount: amount,
//             currency: 'usd',
//             customer: customer.id,
//             receipt_email: token.email,
//             description: "a test account",
//             shipping: {
//                 name: token.card.name,
//                 address: {
//                     line1: token.card.address_line1,
//                     line2: token.card.address_line2,
//                     city: token.card.address_city,
//                     country: token.card.address_country,
//                     postal_code: token.card.address_zip
//                 }
//             }
//         } , {idempotencyKey})
//         .then(result => {
//             res.status(200).json(result);
//         })
//         .catch(err => console.log(err));
//     })
// };