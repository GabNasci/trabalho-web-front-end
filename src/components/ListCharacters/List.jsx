import { useState, useCallback, useEffect } from "react";
import styles from "./List.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const List = () => {
    const [characters, setcharacter] = useState([])
    const [loading, setLoading] = useState([])
    const [input, setInput] = useState()
    const [page, setPage] = useState('https://rickandmortyapi.com/api/character?page=1')
    //use context biblioteca zustand

    const onInputChange = (e) => {
        setInput(e.target.value)
        getCharacter()
    }

    const getCharacter = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${input}`)
            console.log(response.data)
            setcharacter(response.data.results)
            
        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }
    }


    const getCharacters = useCallback(async (pagina) => {
        try {
            const response = await axios.get(pagina)
            setcharacter(response.data.results)
        } catch (error) {
            console.log(error)
        }
    }, [page])

    useEffect(() => {
        getCharacters(page);

    }, [getCharacters])


    const nextPage = async () => {
        try {
            const response = await axios.get(page)
            const nextResponse = await axios.get(response.data.info.next)
            setcharacter(nextResponse.data.results)
            setPage(response.data.info.next)

        } catch (error) {
            console.log(error)
        }
    }

    const prevPage = async () => {
        try {
            const response = await axios.get(page)
            const prevResponse = await axios.get(response.data.info.prev)
            setcharacter(prevResponse.data.results)
            setPage(response.data.info.prev)
        } catch (error) {
            console.log(error)
        }
    }

    const handleNavigate = (id) => {
        return navigate(`/character/${id}`)
    }

    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <h1>Lista de Personagens</h1>
            <div>
                <label htmlFor="search">Busca:</label>
                <input type="search" id="search" value={input} onChange={onInputChange}/>
                
            </div>
            
            <section className={styles.container_cards}>
                {characters.map((item, key) => {
                    return (
                        <div onClick={() => handleNavigate(item.id)} className={styles.card} key={key}>
                            <h3>{item.name}</h3>
                            <div className={styles.card_body}>
                                <img src={item.image} alt="" />
                                <div className={styles.card_section}>
                                    <div className={styles.infos}>
                                        <div>
                                            <p>Gênero:</p>
                                            <p>{item.gender}</p>
                                        </div>
                                        <div>
                                            <p>Espécie:</p>
                                            <p>{item.species}</p>
                                        </div>
                                    </div>
                                    <div className={styles.status}>
                                        <p>Status:</p>
                                        <p>{item.status}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </section>
            <div>
                <button onClick={prevPage}>Prev</button>
                <button onClick={nextPage}>Next</button>
            </div>
        </div>
    );
}

export default List;