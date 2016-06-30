# Weather app

[Live](http://marsel.name/weather/)

I use this project to try new features in the React world.

Currently it can:

  * add a city
  * remove a city
  * help you spell a city name
  * detect your city
  
The list of technologies and approaches:

  * react
  * redux
  * webpack
  * hot reloading
  * es6, es7
  * localStorage (instant reloading)
  * flexbox (try to resize)
  * material ui typography

For the server side I wrote a simple Go application and run it on Heroku.

# Installation

```
npm install
npm start
```

![screenshot](https://raw.githubusercontent.com/mrsln/weather/master/screenshot.png)

## Ideas ##

  * dnd for sorting
  * a spinner in the city search
  * editing existing city
  * somehow show if it's raining, snowing or just cloudy
  * show pictures of the city (from flickr, instagram or webcams)
  * refactor dispatching the action