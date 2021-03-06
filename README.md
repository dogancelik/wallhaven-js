# wallhaven

A library for searching Wallhaven.

## Install

```
npm install wallhaven
```

### Global Install

```
npm install -g wallhaven
```

If you install globally, you can use *wallhaven* CLI tool.

## Usage

```js
var wallhaven = require('wallhaven');

var myOptions = {
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

wallhaven(myOptions)
  .then(function (wallpapers) {
    console.log(wallpapers[0]); // show first wallpaper

    /*
      wallpapers[0] = {
        id: 123,
        resolution: "1024x768",
        favorites: 10,
        pageUrl: "https://alpha.wallhaven.cc/wallpaper/123",
        thumbnailUrl: "https://alpha.wallhaven.cc/wallpapers/thumb/small/th-123.jpg",
        imageUrl: "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-123.jpg"
      }
    */
  });
```

### CLI usage

**Find wallhaven CLI tool path:**

```
npm bin wallhaven
```

**Set a random wallpaper:**

```sh
wallhaven search ""sky"" -c=general -p=sfw -r=1920x1080+ -s=random -i=1 --set
```

**Get search results as URLs:**

```sh
wallhaven search ""sky"" --all
```
