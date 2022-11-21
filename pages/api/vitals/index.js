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
    const {
      name,
      temperature,
      pulse,
      respiration,
      bloodPressure,
      nurseName,
      comment,
      timeUploaded,
    } = req.body;
    if (
      !name ||
      !temperature ||
      !pulse ||
      !respiration ||
      !bloodPressure ||
      !nurseName ||
      !comment
    ) {
      res.status(422).json({
        message: "invalid data...Make sure all fields are correctly filled",
      });
      return;
    }
    const vitalData = {
      name,
      temperature,
      pulse,
      respiration,
      bloodPressure,
      nurseName,
      comment,
      timeUploaded,
    };
    const db = await client.db();
    try {
      const result = await db.collection("vitals").insertOne(vitalData);
      console.log(result);
      res
        .status(201)
        .json({ message: `successfully uploaded ${name} vitals ` });
    } catch (error) {
      res.status(500).json({ message: "Adding new patient failed!!!" });
    }
  }
  if (req.method === "GET") {
    const db = await client.db();

    const data = await db.collection("vitals").find().toArray();
    res.status(201).json({ message: data });
  }
  client.close();
}
