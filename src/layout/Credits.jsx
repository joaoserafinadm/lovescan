
import { Star } from 'lucide-react'
import Button from '../components/Button'
import styles from './Header.module.css'
import useSWR from 'swr'
import api from '@/utils/api'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react'
import Link from 'next/link'


export default function Credits(props) {

    const token = jwt.decode(Cookie.get('auth'))

    const { data, error, isLoading } = useSWR(`/api/credits?user_id=${token?._id}`, api)

    const [credits, setCredits] = useState(0)


    useEffect(() => {
        if(data){
            setCredits(data.credits)
        }
    }, [data])


    return (
        <div className={`${styles.creditsIcon}`}>
            <Link href="/credits">
            <Button  rounded="full" >{credits || 0} <Star size={20} className='ms-1'/></Button>
            </Link>
        </div>
    )
}