import { connect } from '@/utils/db'
import { sign } from 'jsonwebtoken'
// Corrigindo a importação do cookie - usando require em vez de import
const cookie = require('cookie')
import bcrypt from 'bcrypt'


export default async (req, res) => {

    if (req.method === "POST") {

        const { userName, email, password } = req.body

        if (!userName || !email || !password) return res.status(400).json({ error: 'Missing body parameters.' });

        const { db } = await connect();

        const userExist = await db.collection('users').findOne({ email });
        if (userExist) return res.status(400).json({ error: 'User already exists.' });

        const saltPassword = await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(password, saltPassword)

        const data = {
            userName,
            email,
            password: securePassword,
            createdAt: new Date(),
            credits: 0
        }

        const { insertedId: userId } = await db.collection('users').insertOne(data);
        if (!userId) return res.status(400).json({ error: 'Error creating user.' });

        const claims = {
            _id: userId,
            userName,
            email
        }

        const jwt = sign(claims, process.env.JWT_SECRET, {
            expiresIn: '365d'
        })

        // Definindo o cookie
        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 31536000
        }));

        return res.status(200).json({ message: 'User created successfully.' });

    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }



}