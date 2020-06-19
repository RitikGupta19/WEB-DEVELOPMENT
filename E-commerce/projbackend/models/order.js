const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number,
});

const ProductCart = mongoose.model('ProductCart', ProductCartSchema);

const OrderSchema = new Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: String
    },
    status: {
        type: String,
        default: "Recieved",
        // Validates that status always have value that is present in enum
        enum: ["Cancelled", "Delivered", "Processing", "Recieved", "Shipped"]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
},{
    timestamps: true
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };