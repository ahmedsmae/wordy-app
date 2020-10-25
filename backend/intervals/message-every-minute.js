var schedule = require('node-schedule');

// https://www.npmjs.com/package/node-schedule
// https://www.npmjs.com/package/node-cron

module.exports = function() {
  var j = schedule.scheduleJob('30 * * * * *', function() {
    console.log('This is the 30s second now');
  });

  console.log(j);
};
