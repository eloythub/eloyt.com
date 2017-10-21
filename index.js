const path    = require('path')
const express = require('express')
const app     = express()

app.use(express.static('app'))

app.get('/healthz', (req, res) => {
  res.send('OK')
})

app.use('/terms', express.static(path.join(__dirname, 'app', 'terms.html')))
app.use('/faq', express.static(path.join(__dirname, 'app', 'faq.html')))

app.listen(process.env['EXPOSE_PORT'] || 80, () => {
  console.log(`eloyt.com is exposed on port: ${process.env['EXPOSE_PORT'] || 80}`)
})
