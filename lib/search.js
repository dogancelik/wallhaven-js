const cheerio = require('cheerio');
const request = require('request');
const Promise = require('bluebird');
const extend = require('node.extend');

const SEARCH_URL = 'https://alpha.wallhaven.cc/search';
const IMG_BASE = 'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-';

const defaultOptions = {
  term: '',
  categories: {
    general: true,
    anime: true,
    people: true
  },
  purity: {
    sfw: true,
    sketchy: false,
    nsfw: false
  },
  resolutions: [],
  sorting: 'random',
  page: 1
};

function getBitValues (obj, arr) {
  return arr.map(i => obj[i]).map(i => i ? '1' : '0').join('');
}

function createQuery (options) {
  var query = '?';
  query += 'q=' + encodeURIComponent(options.term.trim());
  query += '&categories=' + getBitValues(options.categories, ['general', 'anime', 'people']);
  query += '&purity=' + getBitValues(options.purity, ['sfw', 'sketchy', 'nsfw']);
  query += '&resolutions=' + encodeURIComponent(options.resolutions.join(','));
  query += '&sorting=' + options.sorting;
  query += '&page=' + options.page;
  return query;
}

function makeSearch (options) {
  var query = createQuery(options);

  return new Promise(function (resolve, reject) {
    request({
      url: SEARCH_URL + query
    }, function (err, res, body) {
      if (err) reject(err);
      if (res.statusCode === 200) {
        resolve(body);
      } else {
        reject(new Error('Status code is not 200'));
      }
    });
  });
}

function parsePage (body) {
  var $ = cheerio.load(body);

  return $('#thumbs figure').map(function () {
    var el = $(this);
    var id = el.attr('data-wallpaper-id');
    return {
      id: id,
      resolution: el.find('.wall-res').text().replace(' x ', 'x'),
      favorites: parseInt(el.find('.wall-favs').text(), 10),
      pageUrl: el.find('.preview').attr('href'),
      thumbnailUrl: el.find('.lazyload').attr('data-src'),
      imageUrl: `${IMG_BASE}${id}.jpg`
    };
  }).get();
}

module.exports = function (options) {
  return makeSearch(extend({}, defaultOptions, options)).then(parsePage);
}
