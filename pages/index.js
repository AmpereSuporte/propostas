import React, { useEffect } from "react";
import Logo from "../utils/logo.png";
import Image from "next/image";
import Link from "next/link";
import OEM from "../utils/oem.png";
import File from "../utils/file.png";
import { useRouter } from "next/router";
function Index(props) {
  const router = useRouter();
  useEffect(() => {
    if (!props.credentials._id) {
      router.push("/auth/auth");
    }
  }, []);
  return (
    <div className="flex flex-col bg-zinc-100 w-screen h-screen">
      <div className="w-full flex flex-col items-center justify-center h-52">
        <Image
          src={Logo}
          width="100px"
          height="100px"
          className="rounded-full"
        />
        <h1 className="text-3xl text-[#15599b] text-center font-raleway pt-3 uppercase font-bold">
          Departamento de Suporte técnico
        </h1>
      </div>
      <h1 className="text-3xl self-center text-[#15599b] mb-6 font-raleway font-bold">
        Serviços
      </h1>
      <div
        className={
          props.credentials.admin
            ? `grid h-full lg:grid-cols-2 lg:grid-rows-1 grid-rows-2 gap-x-2`
            : "w-full h-full grid grid-cols-1 grid-rows-1 p-2"
        }
      >
        <div className="cursor-pointer h-full">
          <Link href="/proposes">
            <div className="flex items-center justify-center h-full bg-blue-500 hover:bg-blue-700 px-2 py-4">
              <Image height="100px" width="100px" src={File} />
              <p className="text-white font-raleway font-semibold cursor-pointer">
                Controle de propostas O&M
              </p>
            </div>
          </Link>
        </div>
        {props.credentials.admin && (
          <div className="cursor-pointer h-full">
            <Link href="/os">
              <div className="flex items-center justify-center bg-amber-400 hover:bg-amber-500 h-full px-2 py-4">
                <Image height="100px" width="100px" src={OEM} />
                <p className="text-white font-raleway font-semibold cursor-pointer">
                  Controle OS's
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
