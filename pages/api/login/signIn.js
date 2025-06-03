import bcrypt from 'bcrypt'
import { connect } from '../../../utils/db'
import { ObjectID } from 'bson'
import { sign } from 'jsonwebtoken'
const cookie = require('cookie')


export default async (req, res) => {

    if (req.method === 'POST') {

        const { email, password } = req.body

        const { db } = await connect()

        const userExists = await db.collection('users').findOne({ email })


        if (!userExists) {
            res.status(400).json({ error: 'Wrong e-mail or password.' })
        } else {



            bcrypt.compare(password, userExists.password, async function (err, result) {
                if (!err && result) {
                    const claims = {
                        _id: userExists._id,
                        userName: userExists.userName,
                        profileImageUrl: userExists.profileImage?.url || ''
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


                    res.status(200).json({ message: 'Ok' })


                } else {
                    res.status(400).json({ error: 'Wrong e-mail or password.' })
                }
            })
        }
    }

    else {
        res.status(400).json({ error: 'Wrong request method' })
    }

}