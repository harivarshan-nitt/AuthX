const mongoose = require('mongoose');

const clientAppSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    clientAppId: {
        type: String,
        required: true,
    },
    clientAppSecret: {
        type: String,
        required: true,
    },
    redirectUri: {
        type: String,
        required: true,
    },
    scopes: [{
        type: String,
        enum: ["NAME", "EMAIL"],
        required: true,
    }],
    users: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
        },
        auth_code: String
    }],
}, { timestamps: true });

module.exports = mongoose.model('ClientApp', clientAppSchema);