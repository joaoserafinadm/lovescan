import { connect } from '@/utils/db'
import { verify } from 'jsonwebtoken'
import { ObjectId } from 'bson'


const authenticated = fn => async (req, res) => {
    verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res)
        }
        res.status(500).json({ message: 'You are not authenticated.' });
    })
}


export default authenticated(async (req, res) => {

    if (req.method === "POST") {

        const { user_id, presentationData } = req.body

        if (!user_id || !presentationData) return res.status(400).json({ error: 'Missing body parameters.' });

        const { db } = await connect();

        const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });
        if (!userExist) return res.status(400).json({ error: 'User does not exist.' });

        const newPresentationData = {
            ...presentationData,
            status: 'pending',
            createdAt: new Date(),
            user_id
        }

        const { insertedId: presentationId } = await db.collection('presentations').insertOne(newPresentationData);
        if (!presentationId) return res.status(400).json({ error: 'Error creating presentation.' });
        return res.status(200).json({ message: 'User logged in successfully.', presentationId: presentationId });
    }





})