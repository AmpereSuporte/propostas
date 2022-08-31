import React, { useState } from "react";
import { useDrag } from "react-dnd";
import axios from "axios";
import Link from "next/link";
function Card({ propose, fetchProposes }) {
  const [plan, setPlan] = useState(propose.currentPlanOption);
  const [{ isDragging, targetId }, dragRef] = useDrag({
    type: "CARD",
    item: { id: propose._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      targetId: monitor.getTargetIds(),
    }),
  });
  const stages = {
    1: "Em apresentação",
    2: "Em negociação",
    3: "Em fechamento",
    4: "Venda fechada",
  };
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
  var plansForSelection = plans.filter(
    (p) => p.id != propose.currentPlanOption
  );
  var currentPlan = plans.filter((p) => p.id == propose.currentPlanOption);
  function handlePlanChange(plan) {
    setPlan(plan);
    axios
      .post("/api/updatePropose", {
        id: propose._id,
        plan: plan,
      })
      .then((res) => fetchProposes());
  }
  function getCurrentPlanPrice() {
    switch (propose.currentPlanOption) {
      case 0:
        return "-";
      case 1:
        return (
          propose.price * propose.modulesQty +
          1.5 * 2 * propose.distance
        ).toFixed(2);
      case 2:
        return (
          1.3 * propose.price * propose.modulesQty +
          1.5 * 2 * propose.distance
        ).toFixed(2);
      case 3:
        return (
          1.95 * propose.price * propose.modulesQty +
          1.5 * 2 * propose.distance
        ).toFixed(2);
      default:
        return "-";
    }
  }
  return (
    <div
      ref={dragRef}
      key={propose._id}
      className="flex w-full flex-col gap-y-2 py-2 mt-2 border border-gray-200 rounded shadow-lg"
    >
      <div className="flex justify-around">
        <p className="text-center">{propose.clientName}</p>
        <Link href={`/pdf/propose/${propose._id}`}>
          <button className="bg-[#f6c228] px-2 rounded">Ver</button>
        </Link>
        <p className="bg-green-400 rounded px-1">R$ {getCurrentPlanPrice()}</p>
      </div>
      <div className="w-full hidden xl:flex justify-around">
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase text-gray-400">Plano:</span>
          <select
            onChange={(e) => handlePlanChange(e.target.value)}
            className="outline-none rounded text-base text-center"
          >
            <option defaultValue value={propose.currentPlanOption}>
              {currentPlan[0].text}
            </option>
            {plansForSelection.map((plan) => (
              <option key={plan.text} value={plan.id}>
                {plan.text}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase text-gray-400">Estágio:</span>
          <p className="text-xs text-center uppercase text-[#15599b]">
            {stages[propose.negotiationStage]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
