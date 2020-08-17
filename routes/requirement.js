const router = require('express').Router();
let Requirement = require('../model/requirement');
const { find, db } = require('../model/requirement');

router.route('/home').get((req, res) => {
  console.log('Entered into Get Home API call...');
  Requirement.aggregate(
      [
        {
          $match: 
          { requirementSts : /open/i }
        },   
        {
          $group:
            {
              _id: "$primarySkills", 
              totalopenPositions: { $sum: { $toInt: "$openPosition" } },
              totalfilledPositions: { $sum: { $toInt: "$filledPositions" } },
              totalprofilesReceived: { $sum: { $toInt: "$profilesReceived" } },
              totalprofilesSubmitted: { $sum: { $toInt: "$profilesSubmitted" } },
              totalpendClientInterview: { $sum: { $toInt: "$pendClientInterview" } },
              totalclientRejected: { $sum: { $toInt: "$clientRejected" } }
            }
        },
        {
          $project:
            {
              "primarySkills" : "$_id",
              "totalopenPositions" : 1, 
              "totalfilledPositions" : 1,
              "totalprofilesReceived" : 1,
              "totalprofilesSubmitted" : 1,
              "totalpendClientInterview" : 1,
              "totalclientRejected" : 1,
              _id : 0,
            }
        },
        {
          $sort: 
            {
              "primarySkills" : 1
            }
        }
      ]
   )
  .then(requirement => res.json(requirement))
  .catch(err => res.status(400).json('Error' + err));
});

router.route('/').get((req, res) => {

  Requirement.find()
    .then(requirements => res.json(requirements))
    .catch(err => res.status(400).json('Error:' + err))
});

router.route('/add').post((req, res) => {
  console.log('Entered into Add Requirement API call...');
  const _id = req.body._id;
  const winzoneID = req.body.winzoneID;
  const openDate = new Date(req.body.openDate);
  const statementOrder = Number(req.body.statementOrder);
  const department = req.body.department;
  const jobTitle	= req.body.jobTitle;	
  const primarySkills = req.body.primarySkills;
  const jobDescription = req.body.jobDescription;
  const startDate = new Date(req.body.startDate);	
  const duration = Number(req.body.duration);
  const requirementSts = req.body.requirementSts;
  const clientRate = Number(req.body.clientRate);
  const vendorRate = Number(req.body.vendorRate);	
  const openPosition = Number(req.body.openPosition);	
  const filledPositions = Number(req.body.filledPositions);
  const profilesReceived = Number(req.body.profilesReceived);
  const profilesSubmitted = Number(req.body.profilesSubmitted);
  const pendClientInterview = Number(req.body.pendClientInterview);
  const clientRejected = Number(req.body.clientRejected);
  const resourceInformation = req.body.resourceInformation;

  const newRequirement = new Requirement ({
      _id,
      winzoneID,
      openDate,
      statementOrder,
      department,
      jobTitle,
      primarySkills,
      jobDescription,
      startDate,
      duration,
      requirementSts,
      clientRate,
      vendorRate,
      openPosition,
      filledPositions,
      profilesReceived,
      profilesSubmitted,
      pendClientInterview,
      clientRejected,
      resourceInformation
  });

  newRequirement.save()
  .then(() => res.json('Requirement is added'))
  .catch(err => res.status(400).json('Error:' + err));
});

//Update requirement based on the ID
router.route('/update/:id').post((req,res) => {
  Requirement.findById(req.params.id).then(requirement =>{
    requirement._id = req.body._id;
    requirement.winzoneID = req.body.winzoneID;
    requirement.openDate = req.body.openDate;
    requirement.statementOrder = req.body.statementOrder,
    requirement.department = req.body.department;
    requirement.jobTitle = req.body.jobTitle;
    requirement.primarySkills = req.body.primarySkills;
    requirement.jobDescription = req.body.jobDescription;
    requirement.startDate = req.body.startDate;
    requirement.duaration = req.body.duration;
    requirement.requirementSts = req.body.requirementSts;
    requirement.clientRate = req.body.clientRate;
    requirement.vendorRate = req.body.vendorRate;
    requirement.openPosition = req.body.openPosition;
    requirement.filledPositions = req.body.filledPositions;
    requirement.profilesReceived = req.body.profilesReceived;
    requirement.profilesSubmitted = req.body.profilesSubmitted;
    requirement.pendClientInterview = req.body.pendClientInterview;
    requirement.clientRejected = req.body.clientRejected;
    requirement.resourceInformation = req.body.resourceInformation

    requirement.save()
      .then(() => res.json('Requirement is updated'))
      .catch(err => res.status(400).json('Error:' + err))
  }).catch(err => res.status(400).json('Error:' + err))
});


module.exports = router;
