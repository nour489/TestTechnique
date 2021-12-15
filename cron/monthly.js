let CronJob = require('cron').CronJob;



// 4:10 every 1st of a month
new CronJob('10 4 1 * * ', function() {

}, null, true, 'Africa/Tunis').start();
