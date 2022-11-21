import { MongoClient } from "mongodb";
import connectToDatabase from "../../../lib/lib";

export default async function handler(req, res) {
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connecting to the database failed" });
    return;
  }

  if (req.method === "POST") {
    const { name, dose, patient, time, route } = req.body;
    if (!name || !dose || !patient || !time || !route) {
      res.status(422).json({
        message: "invalid data...Make sure all fields are correctly filled",
      });
      return;
    }

    const drugData = {
      name,
      dose,
      patient,
      time,
      route,
    };

    const db = await client.db();
    try {
      const result = await db.collection("Drugs").insertOne(drugData);
      console.log(result);
      res
        .status(201)
        .json({ message: `successfully recorded ${patient} drugs ` });
    } catch (error) {
      res.status(500).json({ message: "Recording drug failed!!!" });
    }
  }
  if (req.method === "GET") {
    const db = await client.db();
    const data = await db
      .collection("Drugs")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(201).json({ message: data });
  }
}
