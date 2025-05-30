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

    if(req.method ==="POST") {

        const {user_id, presentation_id} = req.body

        if (!user_id || !presentation_id) return res.status(400).json({ error: 'Missing body parameters.' });

        const { db } = await connect();

        const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });
        if (!userExist) return res.status(400).json({ error: 'User does not exist.' });

        const presentationExist = await db.collection('presentations').findOne({ _id: new ObjectId(presentation_id) });
        if (!presentationExist) return res.status(400).json({ error: 'Presentation does not exist.' });

        if(+userExist.credits === 0) return res.status(400).json({ error: 'You do not have enough credits.' });

        const presentationResponse = await db.collection("presentations").updateOne({ _id: new ObjectId(presentation_id) }, { $set: { status: "active" } });

        const response = await db.collection('users').updateOne({ _id: new ObjectId(user_id) }, { $inc: { credits: -1 } });

        return res.status(200).json({ message: "Success" });
    }




})