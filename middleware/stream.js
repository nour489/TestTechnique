const colors = require('cli-color');

let stream = {
  write: function(request, encoding) {
    let ip = request.slice(request.indexOf('::') + 7, request.indexOf('::') + 9)
    let localIp = request.slice(request.indexOf('::'), request.indexOf('::') + 3)

    let statusCode = request.slice(0, 1)
    if (statusCode == 2) {
      //log().debug(colors.bgGreen(request));
      console.log(colors.bgGreen(request+"💚💚💚💚💚"));
      //console.log('\x1b[42m', request);
    } else if (statusCode == 3) {
      console.log(colors.bgCyan(request+"⚓⚓⚓⚓⚓"));
      //console.log('x1b[36m%s\x1b[0m', request);
    } else if (statusCode == 4) {
      //console.log('\x1b[33m%s\x1b[0m', request);
      console.log(colors.bgYellow(request+"❌❌❌❌❌"));
    } else {
      console.log(colors.bgRed(request));
      //console.log('\x1b[31m', request);
    }

  },
};




module.exports = stream;
