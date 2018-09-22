'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  NODE_ENV_API_PATH: '"http://localhost:8081"',
  NODE_ENV_SPOTIFY_API_PATH: '"https://api.spotify.com/v1"',
})
