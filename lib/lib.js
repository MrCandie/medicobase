import { MongoClient } from "mongodb";

export default async function connectToDatabase() {
const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_CLUSTER}.auhnmkn.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
  );
return client;
}
