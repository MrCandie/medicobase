import connectToDatabase from "../../../lib/lib";

export default async function handler(req, res) {
  let client;
  client = await connectToDatabase();

  if (req.method === "POST") {
    const { name, request, sender, time } = req.body;

    if (!name || !request || !sender || !time) {
      res.status(422).json({
        message: "invalid data...Make sure all fields are correctly filled",
      });
      return;
    }

    const requestData = {
      name,
      request,
      sender,
      time,
    };

    const db = client.db();

    try {
      const result = await db.collection("Requests").insertOne(requestData);
      res
        .status(201)
        .json({ message: `Successfully sent request from ${name}` });
    } catch (error) {
      res.status(500).json({ message: "Sending request failed!!!" });
    }
  }
  if (req.method === "GET") {
    const db = client.db();
    const data = await db
      .collection("Requests")
      .find()
      .sort({ _id: -1 })
      .toArray();
    res.status(201).json({ message: data });
  }
  client.close();
}
