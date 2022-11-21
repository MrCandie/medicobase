import { MongoClient } from "mongodb";

export default async function connectToDatabase() {
  // const connectStr = `mongodb+srv://${process.env.mongoDB_username}:${process.env.mongoDB_password}@cluster0.auhnmkn.mongodb.net/${process.env.mongodb_database}retryWrites=true&w=majority`;

  const client = await MongoClient.connect(
    "mongodb+srv://candie:MM0tqGI5WJw4VQLY@cluster0.auhnmkn.mongodb.net/hospital?retryWrites=true&w=majority"
  );

  return client;
}
