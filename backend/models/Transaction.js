import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        get: (v) => parseFloat(v.toFixed(2)) // Format to 2 decimal places
    },
    currency: {
        type: String,
        default: 'KES' // Default currency is Kenyan Shillings
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    }
}, {
    toJSON: { getters: true } // Ensures formatted output
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;