import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Character.module.css"

const Character = () => {
    const { id } = useParams()

    const [character, setCharacter] = useState({})


    const getCharacter = useCallback(async () => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            setCharacter(response.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        getCharacter();

    }, [])

    return (
        <div className={styles.container}>
            <section className={styles.container_body}>
                <div className={styles.container_header}>
                    <h1>target info_</h1>
                </div>
                <section className={styles.container_infos}>
                    <h1>{character.name}</h1>
                    <img src={character.image} alt="" />
                </section>
            </section>

        </div>
    );
}

export default Character;