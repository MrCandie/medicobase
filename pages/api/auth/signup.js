import { hashPassword } from "../../../lib/auth";
import connectToDatabase from "../../../lib/lib";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid inputs. Ensure you enter a valid email and password longer than 6 character",
      });
    }
    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db
      .collection("organization data")
      .findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User exists already" });
      client.close();
      return;
    }
    // const hashedPassword = await hashPassword(password);

    try {
      const result = await db.collection("organization data").insertOne({
        email: email,
        password: password,
      });
      console.log(result);
    } catch (error) {
      res.status(500).json({ message: "Sign Up failed... Try Again!" });
    }

    res.status(201).json({ message: "Sign Up Successful" });

    client.close();
  }
}
