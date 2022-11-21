import { MongoClient } from "mongodb";
import connectToDatabase from "../../lib/lib";

export default async function handler(req, res) {
  let client;
  try {
    client = await connectToDatabase();
  } catch (err) {
    res.status(500).json({ message: "connecting to the database failed" });
    return;
  }
  if (req.method === "POST") {
    const name = req.body.name;
    const _id = req.body._id;
    const age = req.body.age;
    const gender = req.body.gender;
    const address = req.body.address;
    const maritalStatus = req.body.maritalStatus;
    const nextOfKin = req.body.nextOfKin;
    const dateOfAdmission = req.body.dateOfAdmission;
    const occupation = req.body.occupation;
    const familyHistory = req.body.familyHistory;
    const childhoodHistory = req.body.childhoodHistory;
    const presentHistory = req.body.presentHistory;
    const pastHistory = req.body.pastHistory;
    const nursingHistory = req.body.nursingHistory;
    const observation = req.body.observation;
    const complaint = req.body.complaint;
    const temperature = req.body.temperature;
    const pulse = req.body.pulse;
    const respiration = req.body.respiration;
    const bloodPressure = req.body.bloodPressure;
    const comment = req.body.comment;

    if (
      !name ||
      !age ||
      !gender ||
      !address ||
      !maritalStatus ||
      !nextOfKin ||
      !dateOfAdmission ||
      !occupation ||
      !familyHistory ||
      !childhoodHistory ||
      !presentHistory ||
      !pastHistory ||
      !nursingHistory ||
      !observation ||
      !complaint ||
      !temperature ||
      !pulse ||
      !respiration ||
      !bloodPressure ||
      !comment
    ) {
      res.status(422).json({
        message: "Invalid Inputs...Make sure all fields are correctly filled!",
      });
      return;
    }
    const newPatient = {
      name,
      age,
      gender,
      address,
      maritalStatus,
      nextOfKin,
      dateOfAdmission,
      occupation,
      familyHistory,
      childhoodHistory,
      presentHistory,
      pastHistory,
      nursingHistory,
      observation,
      complaint,
      temperature,
      pulse,
      respiration,
      bloodPressure,
      comment,
    };

    const db = await client.db();

    try {
      const result = await db.collection("patients").insertOne(newPatient);
      console.log(result);
      res
        .status(201)
        .json({ message: "successfully registered a new patient" });
    } catch (error) {
      res.status(500).json({ message: "Adding new patient failed!!!" });
    }
    client.close();
  }
  if (req.method === "GET") {
    const db = client.db();
    const data = await db.collection("patients").find().toArray();
    res.status(201).json({ message: data });
  }
}
