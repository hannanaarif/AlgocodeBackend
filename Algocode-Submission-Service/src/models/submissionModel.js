const mongoose = require('mongoose');

const submissionSchema=new mongoose.Schema({
    userId:{
        type:String,
        requird:[true,"user id for submission is missing"],
    },
    problemId:{
        type:String,
        requird:[true,"Problem id for submission is missing"],
    },
    code:{
        type:String,
        requird:[true,"Code for submission is missing"]
    },
    language:{
        type:String,
        requird:[true,"Language for submission is missing"]
    },
    status:{
        type:String,
        enum:["Pending","Success","RE","TLE","MLE","WA"],
        default:"Pending"
    }
});

const Submission=mongoose.model('Submission',submissionSchema);
module.exports=Submission