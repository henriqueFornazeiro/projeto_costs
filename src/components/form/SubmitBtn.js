import styles from './SubmitBtn.module.css'

function SubmitBtn({text}){
    return(
        <div className={styles.form_control}>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubmitBtn