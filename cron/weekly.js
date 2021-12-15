let CronJob = require('cron').CronJob;


// 4:05 every Monday
new CronJob('5 4 * * 1 ', function() {

}, null, true, 'Africa/Tunis').start();
