import { connect } from "@/utils/db";
import { verify } from "jsonwebtoken";
import { ObjectId } from "bson";

const authenticated = (fn) => async (req, res) => {
  verify(
    req.cookies.auth,
    process.env.JWT_SECRET,
    async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res);
      }
      res.status(500).json({ message: "You are not authenticated." });
    }
  );
};

export default authenticated(async (req, res) => {
  if (req.method === "GET") {
    const { user_id } = req.query;

    if (!user_id)
      return res.status(400).json({ error: "Missing query parameters." });

    const { db } = await connect();

    const userExist = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user_id) });
    if (!userExist)
      return res.status(400).json({ error: "User does not exist." });

    const presentations = await db
      .collection("presentations")
      .find({ user_id: user_id })
      .sort({ created_at: -1 }) // Por exemplo, ordenar pelas mais recentes
      .limit(4)
      .toArray();

    return res.status(200).json(presentations || []);
  }
});
