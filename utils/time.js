function getUTCDateTime() {
  var date = new Date();
  var dateUTC = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  var hour = dateUTC.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min = dateUTC.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec = dateUTC.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  var year = dateUTC.getFullYear();
  var month = dateUTC.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day = dateUTC.getDate();
  day = (day < 10 ? "0" : "") + day;
  return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec; // format: 2015-04-10 11:40:50
}

function getEndDateTime(startAt, callback) {
  var date = new Date(startAt);
  date.setSeconds(date.getSeconds() + parseInt(callback));
  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;
  return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec; // format: 2015-04-10 11:40:50
}

function getStartDateTime(startAt, callback) {
  var date = new Date(startAt);
  date.setSeconds(date.getSeconds() - parseInt(callback));
  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;
  return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec; // format: 2015-04-10 11:40:50
}

export {
  getUTCDateTime,
  getEndDateTime,
  getStartDateTime
}