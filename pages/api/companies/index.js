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

    if(req. method === "GET") {

        const {user_id} = req.query

        if (!user_id) return res.status(400).json({ error: 'Missing query parameters.' });

        const { db } = await connect();

        const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });
        if (!userExist) return res.status(400).json({ error: 'User does not exist.' });

        return res.status(200).json({ companyData: userExist.companyData || null });

    }

   else  if(req.method === "POST") {

        const {user_id, ...companyData} = req.body

        if (!user_id || !companyData) return res.status(400).json({ error: 'Missing body parameters.' });

        const { db } = await connect();

        const userExist = await db.collection('users').findOne({ _id: new ObjectId(user_id) });
        if (!userExist) return res.status(400).json({ error: 'User does not exist.' });

        const response = await db.collection('users').updateOne({ _id: new ObjectId(user_id) }, { $set: { companyData: companyData } });
        
        if(response.matchedCount > 0) {
            return res.status(200).json({ message: 'Company data updated.' });
        } else {
            return res.status(400).json({ error: 'Error updating company data.' });
        }
    }






})