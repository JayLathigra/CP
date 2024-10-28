// #####################################################
// Settings
//
var port = 8801
var path = 'aws/'
var enableS3 = true
//
// #####################################################

// #####################################################
// No need to touch
//
module.exports = {
  port: port || 5000,
  s3: {
    Bucket: 'wf-guardian.us-west-2.amazonaws.com',
    // Bucket: 'labs.theguardian.com',
    path: path,
    enable: enableS3
  }
}
//
// #####################################################
