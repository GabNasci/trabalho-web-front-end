import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
import {z} from "zod"
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const loginSchema = z.object({
    email: z.string().email({message: "E-mail inválido!"}),
    password: z.string().min(6, {message: "A senha deve conter no mínimo 6 caractéres!"}),
})

const Login = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(loginSchema)
    })

    const navigate = useNavigate()

    const handleForm = (data) => {
        if(data) navigate('/list')
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(handleForm)} className={styles.card}>
                <div className={styles.card_header}>
                    <h1>Login</h1>
                </div>
                <div className={styles.card_body}>
                    <div>
                        <label htmlFor="email">E-mail: </label>
                        <input type="text" {...register('email')} id="email" placeholder="Digite seu e-mail." />
                        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Senha: </label>
                        <input type="password" {...register('password')} id="password" placeholder="Digite sua senha." />
                        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                    </div>
                </div>
                <div className={styles.card_footer}>
                    <button type="submit" className={styles.btn} >Confirmar</button>
                </div>
            </form>

        </div>
    );
}

export default Login;