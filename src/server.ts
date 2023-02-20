// App instance
import { app } from "@/shared/infra/http/app";

// Configs
import serverConfig from "@/config/server";

app.listen(serverConfig.port, () => {
  console.log(`Server running on ${serverConfig.port} \n`);
});
