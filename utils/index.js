const fs = require('fs')

const files = fs.readdirSync('./functions')
for (const file of files) {
  require('./'+file)
}
