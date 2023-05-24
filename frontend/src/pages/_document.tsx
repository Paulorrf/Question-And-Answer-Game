import Navbar from "@/components/Navbar";
import { Canvas } from "@react-three/fiber";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
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
            <div className="z-50">
              <Navbar />
            </div>
            <Main />
            <NextScript />
          </div>
        </div>
      </body>
    </Html>
  );
}
