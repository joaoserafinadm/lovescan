import { connect } from '@/utils/db'
import { sign } from 'jsonwebtoken'

// Função helper para criar cookie string
function createCookieString(name, value, options = {}) {
    let cookieString = `${name}=${value}`;
    
    if (options.maxAge) cookieString += `; Max-Age=${options.maxAge}`;
    if (options.path) cookieString += `; Path=${options.path}`;
    if (options.sameSite) cookieString += `; SameSite=${options.sameSite}`;
    if (options.secure) cookieString += `; Secure`;
    if (options.httpOnly) cookieString += `; HttpOnly`;
    
    return cookieString;
}

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { user } = req.body
            if (!user) return res.status(400).json({ error: 'Missing body parameters.' });

            const { db } = await connect();
            const userExist = await db.collection('users').findOne({ email: user.email });

            if (!userExist) {
                const data = {
                    userName: user.name,
                    email: user.email,
                    password: '',
                    profileImage: {
                        url: user.image
                    },
                    createdAt: new Date(),
                    credits: 0
                }

                const { insertedId: userId } = await db.collection('users').insertOne(data);
                if (!userId) return res.status(400).json({ error: 'Error creating user.' });

                const newUser = await db.collection('users').findOne({ email: user.email });

                //Get _id from new user
                const { _id, userName, profileImage } = newUser;

                const claims = {
                    _id: _id,
                    userName: userName,
                    profileImageUrl: profileImage.url
                }

                const jwt = sign(claims, process.env.JWT_SECRET, {
                    expiresIn: '365d'
                })

                // Definindo o cookie sem biblioteca externa
                const cookieString = createCookieString('auth', jwt, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    path: '/',
                    maxAge: 31536000
                });

                res.setHeader('Set-Cookie', cookieString);

                return res.status(200).json({ message: 'User created successfully.' });
            } else {
                const claims = {
                    _id: userExist._id,
                    userName: userExist.userName,
                    profileImageUrl: userExist.profileImage?.url || ''
                }

                const jwt = sign(claims, process.env.JWT_SECRET, {
                    expiresIn: '365d'
                })

                // Definindo o cookie sem biblioteca externa
                const cookieString = createCookieString('auth', jwt, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    path: '/',
                    maxAge: 31536000
                });

                res.setHeader('Set-Cookie', cookieString);

                return res.status(200).json({ message: 'User logged in successfully.' });
            }
        } catch (error) {
            console.error('Authentication error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}