import React from "react";
import Card from "./Card";
import { useDrop } from "react-dnd";
import axios from "axios";
function List({ proposes, title, listId, fetchProposes }) {
  function handleDrop(proposeId, stageId) {
    axios
      .put("/api/updatePropose", {
        id: proposeId,
        listId: stageId,
      })
      .then((res) => fetchProposes());
  }
  const [, dropRef] = useDrop({
    accept: "CARD",

    hover(item, monitor) {},
    drop(item, monitor) {
      handleDrop(item.id, listId);
    },
  });
  function getListCumulativePrice() {
    var totalSum = 0;
    for (var i = 0; i < proposes.length; i++) {
      if (proposes[i]?.currentPlanOption == 0) {
        totalSum = totalSum;
      }
      if (proposes[i]?.currentPlanOption == 1) {
        totalSum =
          totalSum +
          (proposes[i].price * proposes[i].modulesQty +
            1.5 * 2 * proposes[i].distance);
      }
      if (proposes[i]?.currentPlanOption == 2) {
        totalSum =
          totalSum +
          (1.3 * proposes[i].price * proposes[i].modulesQty +
            1.5 * 2 * proposes[i].distance);
      }
      if (proposes[i]?.currentPlanOption == 3) {
        totalSum =
          totalSum +
          (1.95 * proposes[i].price * proposes[i].modulesQty +
            1.5 * 2 * proposes[i].distance);
      }
    }
    return totalSum.toFixed(2).replace(".", ",");
  }
  function getListCumulativeModules() {
    var totalSum = 0;
    for (var i = 0; i < proposes.length; i++) {
      let n = Number(proposes[i].modulesQty);
      totalSum = totalSum + n;
    }
    return totalSum;
  }
  function getListCumulativePeakPot() {
    var totalSum = 0;
    for (var i = 0; i < proposes.length; i++) {
      let qty = Number(proposes[i].modulesQty);
      let pot = Number(proposes[i].modulesPot);
      if (isNaN()) {
        totalSum = totalSum;
      } else {
        totalSum = totalSum + pot * qty;
      }
    }
    return (totalSum / 1000).toFixed(2);
  }
  return (
    <div
      ref={dropRef}
      id={listId}
      className="flex flex-col lg:max-h-[550px] max-h-[150px] py-2 overflow-y-auto overscroll-y-auto items-center pt-2 px-1 grow bg-white h-full rounded shadow-2xl"
    >
      <div className="border-b pb-2 h-fit w-full text-center border-blue-300 text-xl font-bold">
        <h1>{title}</h1>
        <div className="flex justify-center gap-x-2">
          <p className="text-xs text-gray-500">R$ {getListCumulativePrice()}</p>
          <p className="text-xs text-gray-500">
            {getListCumulativeModules()} módulos
          </p>
          <p className="text-xs text-gray-500">
            {getListCumulativePeakPot()} kWp
          </p>
        </div>
      </div>
      {proposes?.map((propose) => (
        <Card
          fetchProposes={fetchProposes}
          key={propose._id}
          propose={propose}
        />
      ))}
    </div>
  );
}

export default List;
