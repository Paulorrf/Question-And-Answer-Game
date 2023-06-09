import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";
import Parte1 from "../assets/parte1.png";
import Parte2 from "../assets/parte2.png";
import Parte3 from "../assets/parte3.png";
import Parte4 from "../assets/parte4.png";
import Parte5 from "../assets/parte5.png";
import Parte6 from "../assets/parte6.png";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <div>
        <Head>
          <title>Perguntas App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="text-white">
          <h3 className="mt-16 text-center text-4xl font-bold text-white">
            Bem Vindo(a){" "}
            <span className="underline underline-offset-2">
              JOGO DE PERGUNTAS E RESPOSTAS COM ELEMENTOS DE RPG
            </span>
          </h3>
          <div className="flex h-screen items-center justify-center">
            <div className="ml-16 mt-96 grid grid-cols-2 items-center justify-center gap-1 text-center">
              <div
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                className="rounded p-4"
              >
                <h3>
                  Primeiro Passo,{" "}
                  <Link className="underline" href="/register">
                    crie uma conta
                  </Link>
                </h3>
                <div style={{ width: "90%" }}>
                  <Image
                    src={Parte1}
                    alt="Criar conta"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>

              <div
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                className="rounded p-4"
              >
                <h3>
                  Segundo Passo,{" "}
                  <Link className="underline" href="/login">
                    Faça o Login
                  </Link>
                </h3>
                <div style={{ width: "90%" }}>
                  <Image
                    src={Parte2}
                    alt="Criar conta"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>
              <div
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                className="rounded p-4"
              >
                <h3>
                  Terceiro Passo,{" "}
                  <Link className="underline" href="/login">
                    Agora você está preparado para responder questionários
                  </Link>
                </h3>
                <div style={{ width: "90%" }}>
                  <Image
                    src={Parte3}
                    alt="Criar conta"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>
              <div
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                className="rounded p-4"
              >
                <h3>
                  Quarto Passo,{" "}
                  <Link className="underline" href="/portais">
                    Escolha um dos portais principais
                  </Link>
                </h3>
                <div style={{ width: "90%" }}>
                  <Image
                    src={Parte4}
                    alt="Criar conta"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>
              <div
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                className="rounded p-4"
              >
                <h3>
                  Quinto Passo,{" "}
                  <Link
                    className="underline"
                    href="/portais/especificos/FÍSICA"
                  >
                    Agora escolha um dos sub portais
                  </Link>
                </h3>
                <div style={{ width: "90%" }}>
                  <Image
                    src={Parte5}
                    alt="Criar conta"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>
              <div
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                className="rounded p-4"
              >
                <h3>
                  Sexto Passo,{" "}
                  <Link
                    className="underline"
                    href="/portais/especificos/FÍSICA/lua"
                  >
                    E por último, escolha uma questão para responder
                  </Link>
                </h3>
                <div style={{ width: "90%" }}>
                  <Image
                    src={Parte6}
                    alt="Criar conta"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
