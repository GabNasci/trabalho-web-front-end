import { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Character.module.css"
import { Skeleton } from "antd";

const Character = () => {
    const { id } = useParams()

    const [character, setCharacter] = useState({})
    const [location, setLocation] = useState({})

    const navigate = useNavigate()


    const getCharacter = useCallback(async () => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            setCharacter(response.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const getLocation = useCallback(async () => {
        if (character.location?.url) {
            try {
                const response = await axios.get(character.location.url);
                setLocation(response.data)
            } catch (error) {
                console.log(error);
            }
        }
    }, [character.location?.url]);

    useEffect(() => {
        getCharacter();

    }, [getCharacter])

    useEffect(() => {
        if (character.location?.url) {
            getLocation();
        }
    }, [character, getLocation]);

    return (
        <div className={styles.container}>
            <section className={styles.container_body}>
                <div className={styles.container_header}>
                    <button onClick={() => navigate(-1)} className={styles.btn}><img src="../imgs/prev.svg" alt="" /></button>
                    <h1>target info_</h1>
                    <div></div>
                </div>
                <section className={styles.container_infos}>
                    {!character.name ?
                        <Skeleton.Input
                            active size={350}
                        /> :
                        <img src={character.image} alt="" />
                    }
                    <div className={styles.infos_section}>
                        <Skeleton
                            loading={!character.name}
                            title={{ width: 200 }}
                            paragraph={{ rows: 6, width: [120, 80, 120, 80, 120, 80] }}
                            active
                        >
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
                            <div>
                                <p>Status:</p>
                                <p>{character.status}</p>
                            </div>
                        </Skeleton>
                        <Skeleton
                            loading={!location.name && location.url}
                            title={false}
                            paragraph={{ rows: 4, width: [80, 200, 80, 120] }}
                            active
                        >

                            <div>
                                <p>Location:</p>
                                <p>{location.name + ` - ${location.type}`}</p>
                            </div>
                            <div>
                                <p>Dimension:</p>
                                <p>{location.dimension ? location.dimension : `undefined`}</p>
                            </div>
                        </Skeleton>
                    </div>




                </section>
            </section>

        </div>
    );
}

export default Character;