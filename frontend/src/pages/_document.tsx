// import Navbar from "@/components/Navbar";
import Navbar from "../components/Navbar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <body>
        {/* <div id="canvas-container">
          <Canvas>
            <ambientLight intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <mesh>
              <boxGeometry />
              <meshStandardMaterial />
            </mesh>
          </Canvas>
        </div> */}
        <div className="z-0 h-[900px] min-h-screen bg-bg-image-primary bg-cover bg-scroll bg-center bg-no-repeat">
          <div className="absolute inset-0 h-[900px] min-h-screen bg-black bg-opacity-50">
            <div>
              {/* <div className="z-50">
              <Navbar />
            </div> */}
              <Main />
              <NextScript />
            </div>
          </div>
        </div>
      </body>
    </Html>
  );
}
