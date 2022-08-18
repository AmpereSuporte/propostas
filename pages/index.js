import React from "react";
import Logo from "../utils/logo.png";
import Image from "next/image";
import Link from "next/link";
function Index() {
  return (
    <div className="flex flex-col bg-zinc-100 w-screen h-screen">
      <div className="w-full flex flex-col items-center justify-center h-52">
        <Image
          src={Logo}
          width="100px"
          height="100px"
          className="rounded-full"
        />
        <h1 className="text-3xl text-[#15599b] font-raleway pt-3 uppercase font-bold">
          Departamento de Suporte técnico
        </h1>
      </div>
      <div className="w-full flex flex-col items-center h-1/3">
        <h1 className="text-3xl text-[#15599b] mb-6 font-raleway font-bold">
          Serviços
        </h1>
        <Link href="/proposes">
          <div className="rounded bg-[#15599b] px-2 py-4">
            <p className="text-white font-raleway font-semibold cursor-pointer">
              Controle de propostas O&M
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Index;
