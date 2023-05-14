import "module-alias/register.js";
import Application from "./main.js";

const app = new Application();

async function bootstrap() {
  await app.init()

  await app.start()

  console.log("[Application] started")
}

bootstrap()