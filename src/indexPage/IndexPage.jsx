
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import Button from '../components/Button'


export default function IndexPage(props) {

    const token = jwt.decode(Cookie.get('auth'))

    return (
        <div>
        <Link href="/newPresentation">
          <Button>
            Nova apresentação
          </Button>
        </Link>
      </div>
    )
}