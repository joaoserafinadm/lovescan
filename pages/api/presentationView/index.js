import { connect } from "@/utils/db";
import { ObjectId } from 'bson'



export default async  function handler(req, res) {


    if(req.method === "GET") {

        const {presentation_id} = req.query

        if (!presentation_id) return res.status(400).json({ error: 'Missing query parameters.' });

        const { db } = await connect();

        const presentationExist = await db.collection('presentations').findOne({ _id: new ObjectId(presentation_id) });
        if (!presentationExist) return res.status(400).json({ error: 'Presentation does not exist.' });

        if(presentationExist.status !== "active") return res.status(400).json({ error: 'Presentation is not active.' });

        return res.status(200).json({ presentationData: presentationExist });
    }





}
