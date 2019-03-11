var request = require('request');
var gitToken = require('./secrets');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent' : 'request',
      'Authorization' : 'gitToken'
    }
  }

  request(options, function(err, res, body) {
    cb(err, body);
  });
}
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});


console.log('Welcome to the Github Avatar Downloader!');