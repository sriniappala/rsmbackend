const router = require('express').Router();
let Requirement = require('../model/requirement');

router.route('/home').get((req, res) => {
  console.log('Entered into Get Home API call...');
  Requirement.aggregate(
      [
        {
          $match: 
          { requirementSts : { $eq: "Open"} }
        },   
        {
          $group:
            {
              _id: "$primarySkills", 
              totalopenPositions: { $sum: "$openPosition" },
              totalfilledPositions: { $sum: "$filledPositions" },
              totalprofilesReceived: { $sum: "$profilesReceived" },
              totalprofilesSubmitted: { $sum: "$profilesSubmitted" },
              totalpendClientInterview: { $sum: "$pendClientInterview" },
              totalclientRejected: { $sum: "$clientRejected" }
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

module.exports = router;
