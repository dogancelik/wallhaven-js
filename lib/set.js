const os = require('os');
const wallpaper = require('wallpaper');
const request = require('request');
const Promise = require('bluebird');
const url = require('url');
const path = require('path');
const fs = require('fs');

function getPath (imageUrl, dir) {
  var pathname = url.parse(imageUrl).pathname;
  var filename = path.basename(pathname, path.extname(pathname));

  if (typeof dir === 'undefined') {
    dir = os.tmpdir();
  }

  return path.join(dir, filename);
}

function setWallpaper (imageUrl) {
  return new Promise(function (resolve, reject) {
    var stream = fs.createWriteStream(getPath(imageUrl));
    request(imageUrl)
      .on('end', function () {
        wallpaper.set(stream.path).then(resolve, reject);
      })
      .on('error', function (err) {
        reject(err);
      })
      .pipe(stream);
  });
}

module.exports = setWallpaper;
