import styles from "./Form.module.css"

const Form = ({register, errors, handleSubmit, handleForm, isValid}) => {

    return (
        <form onSubmit={handleSubmit(handleForm)} className={styles.card}>
            <div className={styles.card_header}>
                <h1>login_</h1>
            </div>
            <div className={styles.card_body}>
                <div>
                    <label htmlFor="email">e-mail: </label>
                    <input type="text" {...register('email')} id="email" placeholder="write your email correctly." />
                    {errors.email && <p className={styles.error}>{errors.email.message} <img src="imgs/exclamation.svg" alt="" /> </p>}
                </div>
                <div>
                    <label htmlFor="password">password: </label>
                    <input type="password" {...register('password')} id="password" placeholder="must be at least 6 characters long" />
                    {errors.password && <p className={styles.error}>{errors.password.message} <img src="imgs/exclamation.svg" alt="" /> </p>}
                </div>
                <div className={styles.card_footer}>
                    <button type="submit" disabled={!isValid} className={styles.btn} ><img src="imgs/confirm.svg" alt="" /></button>
                </div>  
            </div>

        </form>
    );
}

export default Form;