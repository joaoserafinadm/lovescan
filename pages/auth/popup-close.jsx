import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";



export default function PopupClose() {

        const { data: session, status } = useSession();
    

    useEffect(() => {
        if(session){

            window.close();
        }


        
    }, [session])
    

    return (
        <div>
            <h1>{session?.user?.name}</h1>
        </div>
    );
}