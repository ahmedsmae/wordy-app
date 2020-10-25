var schedule = require('node-schedule');

module.exports = function() {
  // 5:30 21 December 2012
  // var date = Date.UTC(2012, 11, 21, 5, 30, 0); // convert to epoch
  var date = new Date(2012, 11, 21, 5, 30, 0);
  console.log(date);

  schedule.scheduleJob(date, function() {
    console.log('Date is 5:30 21 December 2012');
  });
};
