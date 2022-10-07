import { ObjectId } from "mongodb";
import connectToDatabase from "../../utils/mongo";
export default async function handler(req, res) {
  const db = await connectToDatabase(process.env.DB_KEY);
  const collection = db.collection("projects");
  await collection.update(
    {},
    [
      {
        $addFields: {
          reports: {
            $map: {
              input: "$reports",
              as: "cl",
              in: {
                $mergeObjects: [
                  "$$cl",
                  {
                    sentDate: {
                      $convert: {
                        input: "$$cl.sentDate",
                        to: "date",
                        onError: null,
                        onNull: null,
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ],
    {
      multi: true,
    }
  );
  return res.json("pronto");
}
