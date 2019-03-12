var request = require('request');
var gitToken = require('./secrets').GITHUB_TOKEN;
var fs = require('fs');

const myArgs = process.argv.splice(2);

// Takes input from the command line (Github username, one of the user's public repo's) and downloads the contributors' avatars to a local directory)

function getRepoContributors(repoOwner, repoName, cb) {

  // Structure for command line input to direct to proper users object.
  // Get headers to establish credentials and authorization to allow for repeted testing.

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'SebastianPez',
      'Authorization': 'token ' + gitToken
    }
  }

  // Transforms plain text from HTTPS response into useable JS.

  function JSONParse(data) {
    var userInfo = JSON.parse(data);
    return userInfo;
  }

  // HTTPS request to Github Server, feeds callback function with JSON parsed data.

  request(options, function(err, res, body) {
    if (err !== null) {
      console.log("Error is: ", err.statusCode);
    }
    res.setEncoding('utf8');
    cb(err, JSONParse(body));
  });
}

// Uses the pulled arguments from CLI to download and write the images to local directory.

getRepoContributors(myArgs[0], myArgs[1], function(err, result) {
  if (myArgs.length !== 2) {
    throw "To download avatars, owner and repo names are required.";
  } else if (err) {
    console.log("Errors: ", err);
    return err;
  } else {
    for (let user of result) {
      downloadImageByURL(user.avatar_url, "./avatars/" + user.login + ".jpeg")
    }
  }
});

// Displays image information/status and designates which directory to save files to.

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      console.log("Error code : " + err.statusCode)
    })

    .on('response', function (res) {
      console.log('Image Info : StatCode: ' + res.statusCode + ', StatMessage: ' + res.statusMessage + ", ContentType: " + res.headers['content-type']);
      console.log("Avatar download complete!")
    })
    .pipe(fs.createWriteStream(filePath))
  }


console.log('Welcome to the Github Avatar Downloader!');