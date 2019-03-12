var request = require('request');
var gitToken = require('./secrets').GITHUB_TOKEN;


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent' : 'SebastianPez',
      'Authorization'  : 'gitToken'
    }
  }
  function JSONParse(data) {
    var userInfo = JSON.parse(data);
    return userInfo;
  }

  request(options, function(err, res, body) {
    res.setEncoding('utf8');
    cb(err, JSONParse(body));
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  for (let users of result) {
    console.log(users.avatar_url);
  }
  console.log("Errors:", err);
  // console.log("Result:", result);
});


console.log('Welcome to the Github Avatar Downloader!');