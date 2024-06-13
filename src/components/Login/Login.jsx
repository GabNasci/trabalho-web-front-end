import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
import { z } from "zod"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
    email: z.string().email({ message: "invalid email" }),
    password: z.string().min(6, { message: "must be at least 6 characters long" }),
})

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const navigate = useNavigate()

    const handleForm = (data) => {
        if (data) navigate('/list')
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(handleForm)} className={styles.card}>
                <div className={styles.card_header}>
                    <h1>login</h1>
                </div>
                <div className={styles.card_body}>
                    <div>
                        <label htmlFor="email">e-mail: </label>
                        <input type="text" {...register('email')} id="email" placeholder="write your email correctly." />
                        {errors.email && <p className={styles.error}>{errors.email.message} <img src="imgs/exclamation.svg" alt="" /> </p>}
                    </div>
                    <div>
                        <label htmlFor="password">password: </label>
                        <input type="password" {...register('password')} id="password" placeholder="try to remember your password." />
                        {errors.password && <p className={styles.error}>{errors.password.message} <img src="imgs/exclamation.svg" alt="" /> </p>}
                    </div>
                    <div className={styles.card_footer}>
                        <button type="submit" className={styles.btn} ><img src="imgs/confirm.svg" alt="" /></button>
                    </div>
                </div>

            </form>

        </div>
    );
}

export default Login;