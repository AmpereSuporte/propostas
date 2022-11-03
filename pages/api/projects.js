import { ObjectId } from "mongodb";
import connectToDatabase from "../../utils/mongo";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { projectInfo } = req.body;
    var responsible;
    if (projectInfo.peakPot < 5) {
      responsible = "Lucas Fernandes";
    } else if (projectInfo.peakPot > 5 && projectInfo.peakPot < 10) {
      responsible = "Gabriel Martins";
    } else {
      responsible = "Luis Eduardo";
    }
    const db = await connectToDatabase(process.env.DB_KEY);
    const collection = db.collection("projects");

    const project = { projectInfo: projectInfo, responsible: responsible };
    await collection.insertOne(project);
    return res.status(201).json("Projeto de O&M criado");
  } else if (req.method === "GET") {
    const db = await connectToDatabase(process.env.DB_KEY);
    const collection = db.collection("projects");
    let projects = await collection.find({}).toArray();
    return res.status(201).json(projects);
  } else if (req.method === "PUT") {
    const db = await connectToDatabase(process.env.DB_KEY);
    const collection = db.collection("projects");
    var string = `reports.${req.body.index}`;
    var currentDate = new Date();
    var newObj = await collection.findOneAndUpdate(
      {
        _id: ObjectId(req.body.id),
        "reports.month": req.body.index + 1,
      },
      {
        $set: {
          "reports.$.sent": req.body.status,
          "reports.$.sentDate": new Date().toISOString(),
        },
      },
      {
        returnDocument: "after",
      }
    );
    return res.json("ATUALIZADO");
  }
}
