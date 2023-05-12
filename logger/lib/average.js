import os = require("os")

const getTimes = () => { return os.cpus().map(c => c.times) }

const getAverageUsage = (timesBefore) => {
  let timesAfter = os.cpus().map(c => c.times);
  let timeDeltas = timesAfter.map((t, i) => ({
      user: t.user - timesBefore[i].user,
      sys: t.sys - timesBefore[i].sys,
      idle: t.idle - timesBefore[i].idle
  }));

  timesBefore = timesAfter;

  return timeDeltas
      .map(times => 1 - times.idle / (times.user + times.sys + times.idle))
      .reduce((l1, l2) => l1 + l2) / timeDeltas.length;
}

module.exports = {
  getTimes,
  getAverageUsage
}