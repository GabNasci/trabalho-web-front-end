import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        <>
            <h1>{character.name}</h1>
            <img src={character.image} alt="" />
        </>
        // <div className={styles.container}>
        //     <header className={styles.header}>

        //         <div>
        //             <h1>Target list</h1>
        //         </div>

        //     </header>
        //     <section className={styles.container_cards}>
        //         <div className={styles.card}>
        //             <h3>{character.name}</h3>
        //             <div className={styles.card_body}>
        //                 <img src={character.image} alt="" />
        //                 <div className={styles.card_section}>
        //                     <div className={styles.infos}>
        //                         <div>
        //                             <p>gender:</p>
        //                             <p>{character.gender}</p>
        //                         </div>
        //                         <div>
        //                             <p>spiece:</p>
        //                             <p>{character.species}</p>
        //                         </div>
        //                     </div>
        //                     <div className={styles.status}>
        //                         <p>Status:</p>
        //                         <p>{item.status}</p>
        //                     </div>
        //                 </div>

        //             </div>
        //         </div>
        //     </section>
        //     <footer className={styles.footer}>
        //         <div>
        //             <button onClick={prevPage}>Prev</button>
        //             <button onClick={nextPage}>Next</button>
        //         </div>
        //     </footer>
        // </div>
    );
}

export default Character;