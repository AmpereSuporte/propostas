import React from "react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { prices, cities } from "../utils/constants";
import Image from "next/image";
import Logo from "../utils/logo.png";
import { useRouter } from "next/router";
export default function ServiceOrder(props) {
  const router = useRouter();
  const [termInfos, setTermInfos] = useState({
    clientName: "",
    cep: "",
    city: "",
    district: "",
    address: "",
    number: "",
    cpf_cnpj: "",
    peakPot: "",
    date: new Date().toLocaleDateString(),
  });
  const [osInfos, setOsInfos] = useState({
    topology: "Inversor",
    modulesQty: 0,
    inverterModel: "",
    tileType: "",
    structureType: "",
    waterPoint: "false",
    wifiPassword: "",
    trafo: "false",
    configureInverter: "false",
    serviceToBeDone: "",
  });
  const [oss, setOss] = useState([]);
  const [cepMessage, setCepMessage] = useState("");
  function handleAPICEP() {
    if (termInfos.cep.length == 8) {
      axios
        .get(`http://localhost:3000/api/cep/${termInfos.cep}`)
        .then((res) => {
          setTermInfos({
            ...termInfos,
            district: res.data.bairro,
            address: res.data.logradouro,
            city: res.data.localidade,
          });
        });
      setCepMessage(null);
    } else {
      setCepMessage("CEP inválido");
    }
  }
  function handleGeneration(type) {
    if (type == "OS") {
      axios
        .post("/api/os", {
          generalInfos: termInfos,
          osInfos: osInfos,
        })
        .then((res) => {
          setTermInfos({
            clientName: "",
            cep: "",
            city: "",
            district: "",
            address: "",
            number: "",
            cpf_cnpj: "",
            peakPot: "",
            date: new Date().toLocaleDateString(),
          });
          setOsInfos({
            topology: "Inversor",
            modulesQty: 0,
            inverterModel: "",
            tileType: "",
            structureType: "",
            waterPoint: "false",
            wifiPassword: "",
            trafo: "false",
            configureInverter: "false",
            serviceToBeDone: "",
          });
        });
    }
    if (type == "TERM") {
      axios
        .post("/api/os", {
          generalInfos: termInfos,
          osInfos: undefined,
        })
        .then((res) => {
          setTermInfos({
            clientName: "",
            cep: "",
            city: "",
            district: "",
            address: "",
            number: "",
            cpf_cnpj: "",
            peakPot: "",
            date: new Date().toLocaleDateString(),
          });
          setOsInfos({
            topology: "Inversor",
            modulesQty: 0,
            inverterModel: "",
            tileType: "",
            structureType: "",
            waterPoint: "false",
            wifiPassword: "",
            trafo: "false",
            configureInverter: "false",
            serviceToBeDone: "",
          });
        });
    }
    if (type == "BOTH") {
      axios
        .post("/api/os", {
          generalInfos: termInfos,
          osInfos: osInfos,
        })
        .then((res) => {
          setTermInfos({
            clientName: "",
            cep: "",
            city: "",
            district: "",
            address: "",
            number: "",
            cpf_cnpj: "",
            peakPot: "",
            date: new Date().toLocaleDateString(),
          });
          setOsInfos({
            topology: "Inversor",
            modulesQty: 0,
            inverterModel: "",
            tileType: "",
            structureType: "",
            waterPoint: "false",
            wifiPassword: "",
            trafo: "false",
            configureInverter: "false",
            serviceToBeDone: "",
          });
        });
    }
  }
  function getOss() {
    axios.get("/api/os").then((res) => {
      setOss(res.data);
    });
  }

  useEffect(() => {
    if (!props.credentials._id) {
      router.push("/auth/auth");
    } else {
      getOss();
    }
  }, []);
  return (
    <div className="flex flex-col w-screen xl:min-h-[100vh] min-h-[100vh] bg-[#15599b]">
      <Link href="/">
        <div className="mb-4 flex justify-center self-center w-[110px] mt-3 bg-white rounded-lg">
          <Image
            width="70px"
            height="70px"
            className="rounded-full cursor-pointer"
            src={Logo}
          />
        </div>
      </Link>
      <h1 className="self-center text-center text-white text-3xl font-raleway font-bold uppercase">
        Controle OSs
      </h1>
      <div className="flex flex-col px-4">
        <h1 className="text-[#f6c228] self-center text-1xl font-raleway font-bold">
          Dados do cliente
        </h1>
        <div className="lg:flex block flex-wrap mt-2 gap-2 justify-around items-center">
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Nome do cliente/empresa
            </span>
            <input
              type="text"
              className="outline-none rounded p-2 text-base h-10 w-64 text-center"
              value={termInfos.clientName}
              onChange={(e) =>
                setTermInfos({ ...termInfos, clientName: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              CEP
            </span>
            <input
              type="number"
              className="outline-none  rounded p-2 h-10 text-base w-64 text-center"
              value={termInfos.cep}
              placeholder="Somente números"
              onChange={(e) =>
                setTermInfos({ ...termInfos, cep: e.target.value })
              }
            />
            <span className="text-red-600">{cepMessage && cepMessage}</span>
          </div>
          <div className="flex flex-col items-center lg:flex-row lg:self-end my-2 lg:my-0">
            <button
              className="align-middle bg-[#f6c228] h-10 px-2 rounded-lg"
              onClick={handleAPICEP}
            >
              Achar CEP
            </button>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Cidade
            </span>
            <input
              type="text"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={termInfos.city}
              onChange={(e) =>
                setTermInfos({ ...termInfos, city: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Bairro
            </span>
            <input
              type="text"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={termInfos.district}
              onChange={(e) =>
                setTermInfos({ ...termInfos, district: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Rua
            </span>
            <input
              type="text"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={termInfos.address}
              onChange={(e) =>
                setTermInfos({ ...termInfos, address: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Número da residência
            </span>
            <input
              type="number"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={termInfos.number}
              onChange={(e) =>
                setTermInfos({ ...termInfos, number: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              CPF/CNPJ
            </span>
            <input
              type="text"
              className="outline-none bg-gray-400 rounded p-2 h-10 text-white text-base w-64 text-center"
              value={termInfos.cpf_cnpj}
              onChange={(e) =>
                setTermInfos({ ...termInfos, cpf_cnpj: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Potência Pico (kWp)
            </span>
            <input
              type="number"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={termInfos.peakPot}
              onChange={(e) =>
                setTermInfos({ ...termInfos, peakPot: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Data
            </span>
            <input
              type="date"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={termInfos.date}
              onChange={(e) =>
                setTermInfos({ ...termInfos, date: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col px-4 mt-4">
        <h1 className="text-[#f6c228] self-center text-1xl font-raleway font-bold">
          Dados do sistema/obra
        </h1>
        <div className="lg:flex block flex-wrap mt-2 gap-2 justify-around items-center">
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Topologia
            </span>
            <select
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={osInfos.topology}
              onChange={(e) =>
                setOsInfos({ ...osInfos, topology: e.target.value })
              }
            >
              <option value="Inversor">Inversor</option>
              <option value="Micro-inversor">Micro-inversor</option>
            </select>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Nº de módulos
            </span>
            <input
              type="number"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={osInfos.modulesQty}
              onChange={(e) =>
                setOsInfos({ ...osInfos, modulesQty: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Modelo do inversor/micro
            </span>
            <input
              type="text"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={osInfos.inverterModel}
              onChange={(e) =>
                setOsInfos({ ...osInfos, inverterModel: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Tipo de telha
            </span>
            <input
              type="text"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={osInfos.tileType}
              onChange={(e) =>
                setOsInfos({ ...osInfos, tileType: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Tipo de estrutura
            </span>
            <input
              type="text"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={osInfos.structureType}
              onChange={(e) =>
                setOsInfos({ ...osInfos, structureType: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Ponto de água
            </span>
            <select
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={osInfos.waterPoint}
              onChange={(e) =>
                setOsInfos({ ...osInfos, waterPoint: e.target.value })
              }
            >
              <option value="false">Não</option>
              <option value="true">Sim</option>
            </select>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Senha do wifi
            </span>
            <input
              type="text"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={osInfos.wifiPassword}
              onChange={(e) =>
                setOsInfos({ ...osInfos, wifiPassword: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Trafo ?
            </span>
            <select
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={osInfos.trafo}
              onChange={(e) =>
                setOsInfos({ ...osInfos, trafo: e.target.value })
              }
            >
              <option value="false">Não</option>
              <option value="true">Sim</option>
            </select>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Configurar inversor/micro
            </span>
            <select
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={osInfos.configureInverter}
              onChange={(e) =>
                setOsInfos({ ...osInfos, configureInverter: e.target.value })
              }
            >
              <option value="false">Não</option>
              <option value="true">Sim</option>
            </select>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Serviço a ser executado
            </span>
            <input
              type="text"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={osInfos.serviceToBeDone}
              onChange={(e) =>
                setOsInfos({ ...osInfos, serviceToBeDone: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
          <button
            onClick={() => handleGeneration("TERM")}
            className="bg-[#f6c228] mt-6 lg:mt-6 place-self-center py-2 px-4 rounded w-64"
          >
            &#x1F4C4; Gerar Termo
          </button>
          <button
            onClick={() => handleGeneration("OS")}
            className="bg-[#f6c228] mt-6 lg:mt-6 place-self-center py-2 px-4 rounded w-64"
          >
            &#x1F4C4; Gerar OS
          </button>
          <button
            onClick={() => handleGeneration("BOTH")}
            className="bg-[#f6c228] mt-6 lg:mt-6 place-self-center py-2 px-4 rounded w-64"
          >
            &#x1F4C4; Gerar Ambos
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-6 lg:mt-12 items-center px-4">
        <div className="grid gap-x-2 items-center grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
          <h1 className="text-[#f6c228] text-center text-2xl uppercase font-raleway font-bold">
            OSs criadas
          </h1>
          <button
            onClick={getOss}
            className="bg-[#f6c228] place-self-center lg:ml-4 xl:place-self-start py-2 px-2 rounded w-32"
          >
            &#x21bb; Atualizar
          </button>
        </div>
        <div className="mt-6 lg:w-[90%] w-full">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full border text-center">
                  <thead className="border-b bg-white">
                    <tr className="grid grid-cols-3">
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900  py-2 border-r"
                      >
                        Nome do cliente
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900  py-2 border-r"
                      >
                        Cidade
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-2"
                      >
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {oss?.map((os) => (
                      <tr
                        key={os._id}
                        className="grid grid-cols-3 py-2 border-b bg-white align-middle"
                      >
                        <td className="px-2 text-sm font-medium text-gray-900">
                          {os.generalInfos.clientName}
                        </td>
                        <td className="px-2 text-sm font-medium text-gray-900">
                          {os.generalInfos.city}
                        </td>
                        <td className="flex justify-center gap-2 items-center  px-2 text-sm font-medium text-gray-900">
                          <Link href={`/pdf/term/${os._id}`}>
                            <button className="bg-[#f6c228] text-center w-18 lg:w-32 px-2 py-1 rounded">
                              Termo
                            </button>
                          </Link>
                          {os.osInfos && (
                            <Link href={`/pdf/os/${os._id}`}>
                              <button className="bg-[#f6c228] ml-0 w-18 lg:w-32 px-2 py-1 rounded">
                                OS
                              </button>
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
