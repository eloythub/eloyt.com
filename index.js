const express = require('express')
const app     = express()

app.use(express.static('app'))

app.listen(process.env['EXPOSE_PORT'] || 80, () => {
  console.log(`eloyt.com is exposed on port: ${process.env['EXPOSE_PORT'] || 80}`)
})
