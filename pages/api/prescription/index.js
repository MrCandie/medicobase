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
    const { name, doctor, prescription, time } = req.body;
    if (!name || !doctor || !prescription) {
      res.status(422).json({
        message: "invalid data...Make sure all fields are correctly filled",
      });
      client.close();
      return;
    }

    const prescriptionData = {
      name,
      doctor,
      prescription,
      time,
    };

    const db = client.db();

    try {
      const result = await db
        .collection("prescription")
        .insertOne(prescriptionData);
      res.status(201).json({ message: "Successfully sent prescription" });
    } catch (error) {
      res.status(500).json({ message: "Sending prescription failed!!!" });
    }
  }
  if (req.method === "GET") {
    const db = client.db();
    const data = await db
      .collection("prescription")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(201).json({ message: data });
  }
}
