import os from "os"

const getAvg_load = () => {
  const avg_load = os.loadavg();
  
  return {
    1: String(avg_load[0]),  //Load average (1 minute)
    2: String(avg_load[1]),  //Load average (5 minute)
    3: String(avg_load[2]),  //Load average (15 minute)
    pid: process.pid
  }
} 

module.exports = getAvg_load