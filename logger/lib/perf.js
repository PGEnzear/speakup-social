const getPerfomance = () => {
  const cpu = osu.cpu
  return {
    cpus: os.cpus(),
    totalmem: os.totalmem(),
    freemem: os.freemem(),
    cpuusage: cpu.usage(),
    pid: process.pid,
  }
}

module.exports = getPerfomance