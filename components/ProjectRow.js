import axios from "axios";
import React, { useState } from "react";
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
function ProjectRow({ p, fetchProjects }) {
  const [info, setInfo] = useState(p);
  function handleChange(id, index, status) {
    console.log(id, index, status);
    axios
      .put("/api/projects", {
        id: id,
        index,
        status,
      })
      .then((res) => {
        fetchProjects();
      });
  }
  return (
    <tr
      key={info._id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <td className="py-4 text-center px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {info.projectInfo.clientName}
      </td>
      <td className="py-4 text-center px-4">{info.projectInfo.clientCity}</td>
      <td className="hidden text-center xl:table-cell py-4 px-4">
        {info.projectInfo.modulesQty}
      </td>
      <td className="hidden text-center xl:table-cell py-4 px-4">
        {info.projectInfo.modulesPot}
      </td>
      <td className="hidden text-center md:table-cell py-4 px-4">
        {plans[info.projectInfo.selectedPlan].text}
      </td>
      <td className="hidden text-center md:table-cell py-4 px-4">
        {info.projectInfo.contractSignatureDate
          ? new Date(
              info.projectInfo.contractSignatureDate
            ).toLocaleDateString()
          : "-"}
      </td>
      <td className="hidden text-center md:table-cell py-4 px-4">
        {info.projectInfo.attendant}
      </td>
      <td className="py-4 text-center px-4">{info.responsible}</td>
      <td className="flex justify-center gap-x-2 py-4 px-4">
        {info.reports?.map((report, i) => (
          <div key={`${i}-${info._id}`}>
            <p>{i + 1}</p>
            <input
              onChange={(e) => {
                setInfo((prevState) => {
                  let temp = {
                    ...prevState,
                    reports: [...prevState.reports],
                  };
                  temp.reports[i].sent = e.target.checked;
                  temp.reports[i].sentDate = new Date().toISOString();
                  return temp;
                });
                handleChange(info._id, i, e.target.checked);
              }}
              type="checkbox"
              checked={report.sent}
            />
          </div>
        ))}
      </td>
    </tr>
  );
}

export default ProjectRow;
