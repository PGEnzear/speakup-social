import birthday from './birthday.task'
import register from './register.task'

class Runner {

  start() {
    birthday.start()
    register.start()
  }
  
}

let arg = new Runner()
export default arg