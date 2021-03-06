const _ = require('lodash');
const chalk = require('chalk');

const search = require('../lib/search');
const resolution = require('../lib/resolution');
const bits = require('../lib/bits');
const set = require('../lib/set');

var yargs = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('search', 'Search wallhaven', {
    category: { alias: 'c', default: 'g,a,p' },
    purity: { alias: 'p', default: 'sfw' },
    resolution: { alias: 'r', default: '1920x1080+' },
    sorting: { alias: 's', default: 'random' },
    page: { alias: 'i', default: '1' },
    set: { default: true },
    all: { default: false },
  }, function (argv) {
    var term = argv._[1];
    search({
      term: term,
      categories: bits(argv.category),
      purity: bits(argv.purity),
      resolutions: resolution(argv.resolution),
      sorting: argv.sorting,
      page: argv.page,
    }).then(function (wallpapers) {
      if (argv.all) {
        return wallpapers.map(i => console.log(i.imageUrl));
      }

      if (argv.set) {
        var index = 0;
        switch (argv.set) {
          case 'random':
          case 'r':
            index = _.random(0, wallpapers.length - 1);
            break;
        }

        var url = wallpapers[index].imageUrl;
        set(url).then(function () {
          console.log(chalk.bold.green('\u2611 Wallpaper is set!'));
        }, function () {
          console.log(chalk.bold.red('\u2612 Error when setting wallpaper!'));
        });
      }
    }, function (err) {
      throw err;
    });
  })
  .version(() => require('../package.json').version)
  .help('help'),
  argv = yargs.argv;

if (argv._.length == 0) {
  yargs.showHelp();
}
