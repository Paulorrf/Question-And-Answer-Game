import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   origin: "http://localhost:3000",
  // });
  const corsOptions: any = {
    // origin: "http://localhost:3000",
    origin: "*",
    // You can set other CORS options here
  };
  app.enableCors(corsOptions);
  app.use(helmet());
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
