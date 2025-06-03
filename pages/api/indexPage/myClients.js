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
    .find({ 
      user_id: user_id,
      clientName: { $exists: true }
    })
    .sort({ createdAt: -1 })
    // .limit(4)
    .toArray();

    return res.status(200).json({presentations: presentations || [], companyData: userExist.companyData || null});
  } else if (req.method === "POST") {
    
    const {user_id, clientName, clientPhone} = req.body

    if (!user_id || !clientName) return res.status(400).json({ error: 'Missing body parameters.' });

    const { db } = await connect();

    const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });
    if (!userExist) return res.status(400).json({ error: 'User does not exist.' });

    const response = await db.collection('presentations').insertOne({ user_id: user_id, clientName: clientName, clientPhone: clientPhone || '', createdAt: new Date() });

    if(response && response.insertedId) {
      return res.status(200).json({ presentation_id: response.insertedId });
    } else {
      return res.status(400).json({ error: 'Something went wrong.' });
    }


  }
});
