import React from "react";
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
    const { name, diagnosis, findings, time, changes, doctor } = req.body;
    if (!name || !diagnosis || !findings || !changes || !doctor) {
      res.status(422).json({
        message: "invalid data...Make sure all fields are correctly filled",
      });
      return;
    }

    const reviewData = {
      name,
      diagnosis,
      findings,
      changes,
      doctor,
      time,
    };

    const db = client.db();

    try {
      const result = await db.collection("Reviews").insertOne(reviewData);
      console.log(result);
      res.status(201).json({ message: `successfully reviewed ${name}` });
    } catch (error) {
      res.status(500).json({ message: "Patient Review failed!!!" });
    }
  }
  if (req.method === "GET") {
    const db = client.db();
    const data = await db
      .collection("Reviews")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(201).json({ message: data });
  }
  client.close();
}
