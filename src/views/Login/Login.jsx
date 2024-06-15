import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
import { z } from "zod"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../components/Form/Form";

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
        if (data) navigate('/targetlist')
    }

    return (
        <div className={styles.container}>
            <Form handleSubmit={handleSubmit} handleForm={handleForm} register={register} errors={errors} />

        </div>
    );
}

export default Login;