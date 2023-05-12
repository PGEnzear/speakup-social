//Requires
import path from "path"
import fs from "fs"

//System info
import log_sysinfo from "./lib/sysinfo.js"
import log_perf from "./lib/perf.js"
import log_avgload from "./lib/avgload.js"
import log_average from "./lib/average.js"

//Process Events
import log_process_beforeExit from "./lib/process/beforeExit.js"
import log_process_exit from "./lib/process/exit.js"
import log_process_sigint from "./lib/process/SIGINT.js"
import log_process_sigbreak from "./lib/process/SIGBREAK.js"
import log_process_sigterm from "./lib/process/SIGTERM.js"
import log_process_sigquit from "./lib/process/SIGQUIT.js"
import log_process_uncaughtException from "./lib/process/uncaughtException.js"
import log_process_unhandledRejection from "./lib/process/unhandledRejection.js"

class Logger {

  constructor(log_folder) {
    this.log_folder = log_folder;
    console.log("[Logger] started")

    process.addListener('beforeExit', code => {
      log_process_beforeExit(code)
      setTimeout(() => {
        console.log(`[Logger] Process will exit with code: ${code}`)
        process.exit(code)
      }, 100)
    })
  
    process.addListener('exit', code => {
      log_process_exit(code)
      console.log(`[Logger] Process exited with code: ${code}`)
    })

    process.addListener('SIGINT', signal => {
      log_process_sigint(signal)
      console.log(`[Logger] Process ${process.pid} received a SIGINT signal`)
      process.exit(0)
    })

    process.addListener('SIGBREAK', signal => {
      log_process_sigbreak(signal)
      console.log(`[Logger] Process ${process.pid} received a SIGBREAK signal`)
      //process.exit(0)
    })

    process.addListener('SIGTERM', signal => {
      log_process_sigterm(signal)
      console.log(`[Logger] Process ${process.pid} received a SIGTERM signal`)
      //process.exit(0)
    })

    process.addListener('SIGQUIT', signal => {
      log_process_sigquit(signal)
      console.log(`[Logger] Process ${process.pid} received a SIGQUIT signal`)
      //process.exit(0)
    })
    
    process.addListener('uncaughtException', err => {
      log_process_uncaughtException(err)
      console.log(`[Logger] Uncaught Exception: ${err.message}`)
    })

    process.addListener('unhandledRejection', (reason, promise) => {
      log_process_unhandledRejection(reason, promise)
      console.log('[Logger] Unhandled rejection at ', promise, `reason: ${err.message}`)
    })
  }
  
  performanceDump() {
    
  }
  
}

const loggerPath = path.join("../", process.env.log_folder)

module.exports = new Logger(loggerPath)