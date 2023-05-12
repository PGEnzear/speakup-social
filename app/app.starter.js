import moduleAlias from "module-alias";

moduleAlias.addAlias("@",__dirname);
moduleAlias()

import Application from "@/main";

async function bootstrap() {
  await Application.init()

  await Application.start()

  console.log("[Application] started")
}

bootstrap()