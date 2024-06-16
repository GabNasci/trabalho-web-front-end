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
                    <img src={character.image} alt="" />
                    <div className={styles.card_section}>
                        <div className={styles.infos}>
                            <div>
                                <h1>{character.name}</h1>
                            </div>
                            <div>
                                <p>Gender:</p>
                                <p>{character.gender}</p>
                            </div>
                            <div>
                                <p>Species:</p>
                                <p>{character.species}</p>
                            </div>
                        </div>
                        <div className={styles.status}>
                            <p>Status:</p>
                            <p>{character.status}</p>
                        </div>
                    </div>
                </section>
            </section>

        </div>
    );
}

export default Character;