const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requirementSchema = new Schema({
    requirementid : { type: String, required: true, unique: true },
    openDate: { type: Date, required: true },
    statementOrder: { type: Number, required: true },
    winzoneID: { type: String, required: true },
    department: { type: String, required: true },
    jobTitle: { type: String, required: true },
    primarySkills: { type: String, required: true },
    JobDescripiton: { type: String, required: true},
    startDate: { type: Date, required: true },
    duration: { type: String, required: true }, 
    requirementSts: { type: String, required: true },  
    clientRate: { type: Number, required: true },      
    vendorRate: { type: Number, required: true },      
    openPosition: { type: Number, required: true },      
    filledPositions: { type: Number, required: true },       
    profilesReceived: { type: Number, required: true },      
    profilesSubmitted: { type: Number, required: true },      
    pendClientInterview: { type: Number, required: true },      
    clientRejected: { type: Number, required: true },      
    resourceInformation: { type: Object}
  });

  const Requirementmodel = mongoose.model('requirement', requirementSchema);

  module.exports = Requirementmodel;