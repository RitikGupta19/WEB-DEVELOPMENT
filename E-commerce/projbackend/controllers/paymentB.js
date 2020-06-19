var braintree = require("braintree");

var gateway = braintree.connect({
  // enviornment details for sandbox
  environment: braintree.Environment.Sandbox,
  merchantId: "kqztd6jyd8mrz5qv",
  publicKey: "8shfcw88z23vprnj",
  privateKey: "32e77c6ec79c7402676e88d1e1d3b0d2"
});

// old methods are used (no arrow functions and 'send') instead of json
exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(response);
        }
      });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(result);
        }
      });
};