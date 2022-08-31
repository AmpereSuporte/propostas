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
      console.log(item.id);
      console.log(listId);
      handleDrop(item.id, listId);
    },
  });
  return (
    <div
      ref={dropRef}
      id={listId}
      className="flex flex-col lg:max-h-[550px] max-h-[150px]  py-2 overflow-y-auto overscroll-y-auto items-center pt-2 px-2 grow bg-white h-full rounded shadow-2xl"
    >
      <h1 className="border-b pb-2 h-fit w-full text-center border-blue-300 text-xl font-bold">
        {title}
      </h1>
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
