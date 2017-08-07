const express = require('express')
const app     = express()

app.use(express.static('app'))

app.get('/healthz', (req, res) => {
  res.send('OK');
});

app.listen(process.env['EXPOSE_PORT'] || 80, () => {
  console.log(`eloyt.com is exposed on port: ${process.env['EXPOSE_PORT'] || 80}`)
})
