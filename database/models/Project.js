const mongoose = require('mongoose');


const projectShcema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    dataExpire: {
        type: Date,
        default: Data.now(),
    },
    client:{
        type: String,
        required: true,
        trim: true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    collaborators:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},{
    timestamps: true
});



module.exports = mongoose.model('Projet', projectShcema)