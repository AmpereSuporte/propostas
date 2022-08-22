import connectToDatabase2 from "../../utils/mongo2";

export default async function handler(req, res) {
  if (req.method === "POST") {
    /*const {
    clientName,
    city,
    attendant,
    modulesQty,
    modulesPot,
    currentEfficience,
    distance,
    price,
  } = req.body;*/
    const { termInfos, osInfos } = req.body;
    const db = await connectToDatabase2(process.env.DB_KEY);
    const collection = db.collection("data");
    await collection.insertOne(req.body);
    console.log("UEPA");
    return res.status(201).json("Dados salvos");
  } else if (req.method === "GET") {
    const db = await connectToDatabase2(process.env.DB_KEY);
    const collection = db.collection("data");
    let OSs = await collection.find({}).toArray();
    return res.status(201).json(OSs);
  }
}
