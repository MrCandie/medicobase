import { MongoClient } from "mongodb";
import connectToDatabase from "../../../lib/lib";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { departmentName } = req.body;
    if (!departmentName) {
      res.status(422).json({
        message: "Invalid Inputs...Make sure all fields are correctly filled!",
      });
      return;
    }

    let client;
    try {
      client = await connectToDatabase();
    } catch (err) {
      res.status(500).json({ message: "connecting to the database failed" });
      return;
    }

    const db = await client.db();

    try {
      const result = await db
        .collection(`${departmentName}`)
        .insertOne({ name: departmentName });
      console.log(result);
      res.status(201).json({ message: "successfully created a new database" });
    } catch (error) {
      res.status(500).json({ message: "Creating a new database failed!!!" });
    }
    client.close();
  }
  res.status(201).json({ message: "Signed created a new database" });
}
