import connectToDatabase from "../../../lib/lib";

export default async function handler(req, res) {
  const {
    _id,
    wardName,
    numNursesDuty,
    numNursesWard,
    numPatient,
    nursesName,
    snrNurse,
  } = req.body;

  const newWard = {
    _id,
    wardName,
    numNursesDuty,
    numNursesWard,
    numPatient,
    nursesName,
    snrNurse,
  };

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: "connecting to the database failed" });
    return;
  }

  if (req.method === "POST") {
    if (
      !wardName ||
      !numNursesDuty ||
      !numNursesWard ||
      !numPatient ||
      !nursesName ||
      !snrNurse
    ) {
      res.status(422).json({
        message: "invalid data...Make sure all fields are correctly filled",
      });
      return;
    }
    const db = await client.db();
    try {
      const result = await db.collection(`${wardName}`).insertOne(newWard);
      console.log(result);
      res.status(201).json({ message: "successfully created a new ward" });
    } catch (error) {
      res.status(500).json({ message: "Adding new patient failed!!!" });
    }
  }
  if (req.method === "GET") {
    const db = await client.db();
    const data = await db.collection("psychiatric ward").find().toArray();
    res.status(201).json({ message: data });
  }
  client.close();
}
