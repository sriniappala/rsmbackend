const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requirementSchema = new Schema({
    _id : { type: String, required: true },
    openDate: { type: Date, required: true },
    statementOrder: { type: Number },
    winzoneID: { type: String },
    department: { type: String },
    jobTitle: { type: String },
    primarySkills: { type: String, required: true },
    jobDescription: { type: String },
    startDate: { type: Date },
    duration: { type: String }, 
    requirementSts: { type: String, required: true },  
    clientRate: { type: Number },      
    vendorRate: { type: Number },      
    openPosition: { type: Number, required: true },      
    filledPositions: { type: Number, required: true },       
    profilesReceived: { type: Number, required: true },      
    profilesSubmitted: { type: Number, required: true },      
    pendClientInterview: { type: Number, required: true },      
    clientRejected: { type: Number, required: true },      
    resourceInformation: { type: Object}
  });

  const Requirementmodel = mongoose.model('requirements', requirementSchema);

  module.exports = Requirementmodel;