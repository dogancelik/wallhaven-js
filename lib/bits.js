const puritySet = ['sfw', 'sketchy', 'nsfw'];
const categorySet = ['general', 'anime', 'people'];

const detectPurity = /^(sf|sk|ns)/i;
const detectCategory = /^(g|a|p)/i;

function detectType (str) {
  var isPurity = detectPurity.test(str);
  var isCategory = detectCategory.test(str);

  if (isPurity) {
    return 'purity';
  } else if (isCategory) {
    return 'category';
  } else {
    throw new Error('Unsupported bit type');
  }
}

function findByChar (str, min, arr) {
  var find = str.substr(0, min);
  arr.forEach(function (i) {
    if (i.indexOf(find) === 0) find = i;
  });
  return find;
}

function sanitize (str) {
  return str.trim();
}

function getBits (str) {
  var type = detectType(str);
  var spl = str.split(',').map(sanitize);

  if (type === 'purity') spl = spl.map(i => findByChar(i, 2, puritySet));
  if (type === 'category') spl = spl.map(i => findByChar(i, 1, categorySet));

  var bits = {};
  spl.forEach(i => bits[i] = true);
  return bits;
}

module.exports = getBits;
