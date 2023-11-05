/*
const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const httpsOptions = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
}
app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    // const baseURL = req.protocol + '://' + req.headers.host + '/'
    const parsedUrl = parse(req.url, true)
    // const test = new URL(req.url, baseURL)
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Server started on https://localhost:3000')
  })
})
*/
