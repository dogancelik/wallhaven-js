const _ = require('lodash');

const availRes = [ '1024x768', '1280x800', '1366x768', '1280x960', '1440x900',
'1600x900', '1280x1024', '1600x1200', '1680x1050', '1920x1080', '1920x1200',
'2560x1440', '2560x1600', '3840x1080', '5760x1080', '3840x2160', '5120x2880', ];

function getAbove (res) {
  res = res.replace('+', '');
  var index = _.findIndex(availRes, i => i === res);
  return availRes.slice(index);
}

function sanitize (str) {
  return str.trim().replace('*', 'x');
}

function parse (str) {
  var modes = [];
  // we don't need if clause here, because split will create an array even if there is no comma
  if (str.includes(',')) {
    modes = modes.concat(str.split(',').map(sanitize));
  } else {
    modes.push(str);
  }

  modes = modes.map(function (mode) {
    return mode.includes('+') ? getAbove(mode) : mode;
  });

  modes = _.flatten(modes);
  return _.uniq(modes);
}

module.exports = parse;
