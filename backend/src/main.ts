import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  // app.enableCors({
  //   origin: "http://localhost:3000",
  // });
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
