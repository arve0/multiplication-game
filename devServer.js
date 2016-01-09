var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config.dev')
var open = require('open')

var app = express()
var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static('dist'))

app.listen(3000, '0.0.0.0', function (err) {
  if (err) {
    return console.log(err)
  }

  console.log('Listening at http://localhost:3000')
  open('http://localhost:3000')
})
