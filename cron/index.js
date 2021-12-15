const fs = require('fs')

const files = fs.readdirSync('./cron')
for (const file of files) {
  require('./'+file)
}
