import { useEffect } from "react";



export default function PopupClose() {

    useEffect(() => {
        window.close();
    }, [])
    return (
        <div>
            <h1>Popup Close</h1>
        </div>
    );
}