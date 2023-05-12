import { Client } from 'redis-om'

class RedisConnector {

  port;
  redisClient;

  init() {
    this.redisClient = new Client();
  }

  async connect(url) {
    await this.redisClient.open(url)
    if(this.redisClient) {
      console.log("[Redis] started")
    }
  }

  async disconnect() {
    await this.redisClient.close()
  }
  
}

let arg = new RedisConnector()
export default arg