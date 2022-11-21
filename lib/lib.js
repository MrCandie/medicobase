import { MongoClient } from "mongodb";

export default async function connectToDatabase() {
  // const connectStr = `mongodb+srv://${process.env.mongoDB_username}:${process.env.mongoDB_password}@cluster0.auhnmkn.mongodb.net/${process.env.mongodb_database}retryWrites=true&w=majority`;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_CLUSTER}.auhnmkn.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
  );

  return client;
}
