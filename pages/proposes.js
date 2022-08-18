import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { prices, cities } from "../utils/constants";
export default function Home() {
  const [infos, setInfos] = useState({
    clientName: "",
    city: cities[0].name,
    attendant: "",
    modulesQty: "",
    modulesPot: "",
    currentEfficience: "",
    distance: 0,
  });
  const [proposes, setProposes] = useState([]);
  function findPrice() {
    for (let i = 0; i < prices.length; i++) {
      console.log(prices[i]);
      if (
        infos.modulesQty >= prices[i].min &&
        infos.modulesQty <= prices[i].max
      ) {
        return prices[i].price;
      }
    }
  }
  function findExpectedGen() {
    let index = cities.findIndex((x) => (x.name = infos.city));
    return cities[index].annualGenFactor;
  }
  function handleProposeGeneration() {
    axios
      .post("/api/propose", {
        ...infos,
        price: findPrice(),
        expectedMonthlyGen: (
          (infos.modulesPot * infos.modulesQty * findExpectedGen()) /
          1000
        ).toFixed(2),
      })
      .then((res) => console.log(res.data));
  }
  function fetchProposes() {
    axios.get("/api/propose").then((res) => setProposes(res.data));
  }
  useEffect(() => {
    fetchProposes();
  }, []);
  console.log(proposes);
  return (
    <div className="flex flex-col w-screen h-screen bg-[#15599b] p-3">
      <h1 className="self-center text-white text-3xl font-raleway font-bold uppercase">
        Controle de propostas O&M
      </h1>
      <div className="flex flex-col px-4">
        <h1 className="text-[#f6c228] text-1xl font-raleway font-bold">
          Geração de propostas
        </h1>
        <div className="flex mt-2 gap-2 justify-between">
          <div className="flex flex-col">
            <span className="text-white text-center mb-2 font-semibold">
              Nome do cliente
            </span>
            <input
              type="text"
              className="outline-none rounded p-2 text-base h-10 w-64 text-center"
              value={infos.clientName}
              onChange={(e) =>
                setInfos({ ...infos, clientName: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-center mb-2 font-semibold">
              Cidade
            </span>
            <select
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={infos.city}
              onChange={(e) => setInfos({ ...infos, city: e.target.value })}
            >
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-center mb-2 font-semibold">
              Atendente
            </span>
            <input
              type="text"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={infos.attendant}
              onChange={(e) =>
                setInfos({ ...infos, attendant: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-center mb-2 font-semibold">
              Qtd. de módulos
            </span>
            <input
              type="number"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={infos.modulesQty}
              onChange={(e) =>
                setInfos({ ...infos, modulesQty: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-center mb-2 font-semibold">
              Pot. dos módulos
            </span>
            <input
              type="number"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={infos.modulesPot}
              onChange={(e) =>
                setInfos({ ...infos, modulesPot: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-center mb-2 font-semibold">
              Eficiência atual
            </span>
            <input
              type="number"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={infos.currentEfficience}
              onChange={(e) =>
                setInfos({ ...infos, currentEfficience: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-center mb-2 font-semibold">
              Distância
            </span>
            <input
              type="number"
              className="outline-none rounded p-2 h-10 text-base w-64 text-center"
              value={infos.distance}
              onChange={(e) => setInfos({ ...infos, distance: e.target.value })}
            />
          </div>
        </div>
        <button
          className="bg-[#f6c228] mt-2 place-self-end py-2 px-4 rounded w-64"
          onClick={handleProposeGeneration}
        >
          Gerar proposta
        </button>
      </div>
      <div className="flex flex-col px-4">
        <h1 className="text-[#f6c228] text-1xl font-raleway font-bold">
          Propostas criadas
        </h1>
        <button
          className="bg-[#f6c228] mt-2 place-self-start py-2 px-4 rounded w-64"
          onClick={fetchProposes}
        >
          Atualizar propostas criadas
        </button>
        <div className="mt-5">
          {proposes?.map((propose) => (
            <Link key={propose._id} href={`/pdf/${propose._id}`}>
              <div className="text-xl mt-2 text-white font-semibold">
                - {propose.clientName}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
