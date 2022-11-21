import { MongoClient } from "mongodb";

export default async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://candie:MM0tqGI5WJw4VQLY@cluster0.auhnmkn.mongodb.net/hospital?retryWrites=true&w=majority"
  );

  return client;
}
