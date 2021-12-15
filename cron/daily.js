let mailer = require('./../microservices/nodemailer')

let CronJob = require('cron').CronJob;

//at 2:00 every day
new CronJob('0 2 * * *', async function() {

}, null, true, 'Africa/Tunis').start();


//Reminder Task Cron Job
