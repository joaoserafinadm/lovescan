
import styles from './AkvoSpinner.module.scss'


export default function AkvoSpinner(props) {


    return (
        <div className={`text-success  ${!props.static ? 'loadingIcon' : ''}`} role="status">


            <div className={`${styles.loader}`}>
            </div>
            <img src="/favicon.ico" alt="" height={25} style={{ position: "relative", top: "-25px", zIndex: "1000000 !important" }} />
        </div>
    )
}