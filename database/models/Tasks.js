const mongoose = require('mongoose');


const tasksShcema = new mongoose.Schema({
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
    state:{
        type: Boolean,
        defaul: false
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    priority:{
        type: String,
        enum : ['Baja', 'Media', 'Alta'],
        default: 'Baja'
    },
    project:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
},{
    timestamps: true
});



module.exports = mongoose.model('Task', projectShcema)