import { useState, useCallback, useEffect } from "react";
import styles from "./List.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";

const List = () => {
    const [characters, setcharacter] = useState([])
    const [numberPages, setNumberPages] = useState()
    const [numberCurrentPage, setNumberCurrentPage] = useState(1)
    const [page, setPage] = useState('https://rickandmortyapi.com/api/character?page=1')
    //use context biblioteca zustand
    const navigate = useNavigate()

    const handleNavigate = (id) => {
        return navigate(`/character/${id}`)
    }

    const pickPageNumber = (pagina) => parseInt(pagina.slice(-2)) > 9 ? pagina.slice(-2) : pagina.slice(-1)


    const getCharacters = useCallback(async (pagina) => {
        try {
            const response = await axios.get(pagina)
            setcharacter(response.data.results)
            setNumberPages(response.data.info.pages)
            setNumberCurrentPage(pickPageNumber(pagina))
        } catch (error) {
            console.log(error)
        }
    }, [page])

    const nextPage = async () => {
        try {
            const response = await axios.get(page)
            if (!response.data.info.next) return
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
            if (!response.data.info.prev) return
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
            <section className={styles.container_body}>
                <div className={styles.container_header}>
                    <h1>target list_</h1>
                </div>
                <section className={styles.container_cards}>
                    {characters.map((item) => {
                        return (
                            <Card item={item} handleNavigate={handleNavigate} key={item.id} />
                        )
                    })}
                </section>
                <div className={styles.container_footer}>
                    <button style={numberCurrentPage == 1 ? {opacity: "0"} : {opacity: "100%"}} className={styles.btn} onClick={prevPage}><img src="imgs/prev.svg" alt="" /></button>
                    <p>{`${numberCurrentPage}/${numberPages}`}</p>
                    <button style={numberCurrentPage == numberPages ? {opacity: "0"} : {opacity: "100%"}} className={styles.btn} onClick={nextPage}><img src="imgs/confirm.svg" alt="" /></button>
                </div>

            </section>

        </div>
    );
}

export default List;