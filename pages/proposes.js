import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { prices, cities } from "../utils/constants";
import Image from "next/image";
import Logo from "../utils/logo.png";
import { useRouter } from "next/router";
import List from "../components/List";

export default function ProposesManagement(props) {
  const router = useRouter();
  const [infos, setInfos] = useState({
    clientName: "",
    city: cities[0].name,
    attendant: props.credentials.user,
    modulesQty: "",
    modulesPot: "",
    currentEfficience: "",
    distance: 0,
  });
  const [message, setMessage] = useState("");
  const [proposesInPresentation, setProposesInPresentation] = useState([]);
  const [proposesInNegotiation, setProposesInNegotiation] = useState([]);
  const [proposesInClosing, setProposesInClosing] = useState([]);
  const [alreadySelled, setAlreadySelled] = useState([]);
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
        negotiationStage: 1,
        currentPlanOption: 0,
      })
      .then((res) => {
        setMessage(res.data);
        setInfos({
          clientName: "",
          city: cities[0].name,
          attendant: props.credentials.user,
          modulesQty: "",
          modulesPot: "",
          currentEfficience: "",
          distance: 0,
        });
      });
  }
  function fetchProposes() {
    setMessage("");
    axios.get("/api/propose").then((res) => {
      let inPresentation = res.data.filter((p) => p.negotiationStage == 1);
      setProposesInPresentation(inPresentation);
      let inNegotiation = res.data.filter((p) => p.negotiationStage == 2);
      setProposesInNegotiation(inNegotiation);
      let inClosing = res.data.filter((p) => p.negotiationStage == 3);
      setProposesInClosing(inClosing);
      let selled = res.data.filter((p) => p.negotiationStage == 4);
      setAlreadySelled(selled);
    });
  }
  function fetchUserProposes() {
    setMessage("");
    axios
      .post("/api/userProposes", { user: props.credentials.user })
      .then((res) => {
        let inPresentation = res.data.filter((p) => p.negotiationStage == 1);
        setProposesInPresentation(inPresentation);
        let inNegotiation = res.data.filter((p) => p.negotiationStage == 2);
        setProposesInNegotiation(inNegotiation);
        let inClosing = res.data.filter((p) => p.negotiationStage == 3);
        setProposesInClosing(inClosing);
        let selled = res.data.filter((p) => p.negotiationStage == 4);
        setAlreadySelled(selled);
      });
  }
  useEffect(() => {
    if (!props.credentials._id) {
      router.push("/auth/auth");
    } else {
      if (props.credentials.admin) {
        fetchProposes();
      } else {
        fetchUserProposes();
      }
    }
  }, []);
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
      <h1 className="self-center text-center text-white text-3xl font-raleway font-bold uppercase">
        Controle de propostas O&M
      </h1>
      <div className="flex flex-col px-4">
        <h1 className="text-[#f6c228] self-center text-1xl font-raleway font-bold">
          Geração de propostas
        </h1>
        <div className="lg:flex block flex-wrap mt-2 gap-2 justify-around items-center">
          <div className="flex flex-col items-center">
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
          <div className="flex flex-col items-center">
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
          <div className="flex flex-col items-center">
            <span className="text-white text-center mb-2 font-semibold">
              Atendente
            </span>
            <input
              type="text"
              className="outline-none bg-gray-400 rounded p-2 h-10 text-white text-base w-64 text-center"
              value={infos.attendant}
              readOnly="readonly"
              onChange={(e) =>
                setInfos({ ...infos, attendant: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center">
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
          <div className="flex flex-col items-center">
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
          <div className="flex flex-col items-center">
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
          <div className="flex flex-col items-center">
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
        {message && (
          <h1 className="text-center mt-2 font-bold text-green-600">
            {message}
          </h1>
        )}
        <button
          className="bg-[#f6c228] mt-6 lg:mt-6 place-self-center py-2 px-4 rounded w-64"
          onClick={handleProposeGeneration}
        >
          &#x1F4C4; Gerar proposta
        </button>
      </div>
      <div className="flex flex-col mt-6 lg:mt-12 items-center px-4">
        <div className="grid gap-x-2 items-center grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
          <h1 className="text-[#f6c228] text-center text-2xl uppercase font-raleway font-bold">
            Propostas criadas
          </h1>
          <button
            className="bg-[#f6c228] place-self-center lg:ml-4 xl:place-self-start py-2 px-2 rounded w-32"
            onClick={
              props.credentials.admin ? fetchProposes : fetchUserProposes
            }
          >
            &#x21bb; Atualizar
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 lg:grid-rows-1 grid-rows-4 grid-cols-1  w-full px-6 py-2 gap-4 mt-5">
        <List
          fetchProposes={
            props.credentials.admin ? fetchProposes : fetchUserProposes
          }
          proposes={proposesInPresentation}
          title="Em apresentação"
          listId={1}
        />
        <List
          fetchProposes={
            props.credentials.admin ? fetchProposes : fetchUserProposes
          }
          proposes={proposesInNegotiation}
          title="Em negociação"
          listId={2}
        />
        <List
          fetchProposes={
            props.credentials.admin ? fetchProposes : fetchUserProposes
          }
          proposes={proposesInClosing}
          title="Em fechamento"
          listId={3}
        />
        <List
          fetchProposes={
            props.credentials.admin ? fetchProposes : fetchUserProposes
          }
          proposes={alreadySelled}
          title="Vendas fechadas"
          listId={4}
        />
      </div>
    </div>
  );
}
