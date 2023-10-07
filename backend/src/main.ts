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
    // origin: "*",
    origin: "http://localhost:3000",
    credentials: true,
    // You can set other CORS options here
  };
  app.use(cookieParser());
  app.enableCors(corsOptions);
  app.use(helmet());
  await app.listen(5000);
}
bootstrap();
