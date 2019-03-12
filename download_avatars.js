var request = require('request');
var gitToken = require('./secrets').GITHUB_TOKEN;
var fs = require('fs');


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'SebastianPez',
      'Authorization': 'token ' + gitToken
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
  if (err) {
    console.log("Errors: ", err);
    return err;
  }
  for (let user of result) {
    downloadImageByURL(user.avatar_url, "./avatars/" + user.login + ".jpeg")
  }
});


function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      console.log("Error code : " + err.statusCode)
    })

    .on('response', function (res) {
      console.log('Image Info : StatCode: ' + res.statusCode + ', StatMessage' + res.statusMessage + ", ContentType: " + res.headers['content-type']);
      console.log("Avatar download complete!")
    })
    .pipe(fs.createWriteStream(filePath))
  }


console.log('Welcome to the Github Avatar Downloader!');