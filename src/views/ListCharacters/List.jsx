import { useState, useCallback, useEffect } from "react";
import styles from "./List.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";

const List = () => {
    const [characters, setcharacter] = useState([])
    const [page, setPage] = useState('https://rickandmortyapi.com/api/character?page=1')
    //use context biblioteca zustand
    const navigate = useNavigate()

    const handleNavigate = (id) => {
        return navigate(`/character/${id}`)
    }

    const getCharacters = useCallback(async (pagina) => {
        try {
            const response = await axios.get(pagina)
            setcharacter(response.data.results)
        } catch (error) {
            console.log(error)
        }
    }, [page])

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

    useEffect(() => {
        getCharacters(page);
    }, [getCharacters])


    return (
        <div className={styles.container}>
            <header className={styles.header}>

                <div>
                    <h1>Target list</h1>
                </div>

            </header>
            <section className={styles.container_cards}>
                {characters.map((item, key) => {
                    return (
                       <Card item={item} handleNavigate={handleNavigate} key={key} />
                    )
                })}
            </section>
            <footer className={styles.footer}>
                <div>
                    <button onClick={prevPage}>Prev</button>
                    <button onClick={nextPage}>Next</button>
                </div>
            </footer>
        </div>
    );
}

export default List;