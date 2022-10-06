import React, { useEffect, useState } from "react";
import axios from "axios";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../utils/logo.png";
import ProjectRow from "../components/ProjectRow";
function Projects(props) {
  const [projects, setProjects] = useState([]);
  const router = useRouter();
  function fetchProjects() {
    axios.get("/api/projects").then((res) => setProjects(res.data));
  }
  useEffect(() => {
    {
      /**    if (props.credentials._id && props.credentials.admin) {
      fetchProjects();
    } else {
      router.push("/auth/auth");
      
    } */
      fetchProjects();
    }
  }, []);

  const plans = [
    {
      id: 0,
      text: "Não definido",
    },
    { id: 1, text: "Manutenção simples" },
    { id: 2, text: "Plano Sol" },
    {
      id: 3,
      text: "Plano Sol+",
    },
  ];
  return (
    <div className="flex flex-col w-screen max-w-full xl:min-h-[100vh] min-h-[100vh] bg-[#15599b]">
      <div className="mb-4 flex justify-center self-center w-[110px] mt-3 bg-white rounded-lg">
        <Link href="/">
          <div>
            <Image
              width="70px"
              height="70px"
              className="rounded-full cursor-pointer"
              src={Logo}
            />
          </div>
        </Link>
      </div>
      <h1 className="text-center text-white text-2xl uppercase font-bold my-4">
        Controle de Projetos
      </h1>
      <div className="overflow-x-auto relative px-12">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 text-center px-6">
                Nome do cliente
              </th>
              <th scope="col" className="py-3 text-center px-4">
                Cidade
              </th>
              <th
                scope="col"
                className="hidden text-center xl:table-cell py-3 px-4"
              >
                Número de módulos
              </th>
              <th
                scope="col"
                className="hidden text-center xl:table-cell py-3 px-4"
              >
                Potência dos módulos
              </th>
              <th
                scope="col"
                className="hidden text-center md:table-cell py-3 px-4"
              >
                Plano adquirido
              </th>
              <th
                scope="col"
                className="hidden text-center md:table-cell py-3 px-4"
              >
                Data de assinatura
              </th>
              <th
                scope="col"
                className="hidden text-center md:table-cell py-3 px-4"
              >
                Atendente
              </th>
              <th scope="col" className="py-3 text-center px-6">
                Responsável
              </th>
              <th
                scope="col"
                className="hidden text-center md:table-cell py-3 px-4"
              >
                Relatórios
              </th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((p) => (
              <ProjectRow fetchProjects={fetchProjects} key={p._id} p={p} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Projects;
