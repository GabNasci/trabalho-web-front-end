import { useState, useCallback, useEffect, useContext } from "react";
import styles from "./List.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import CharacterCard from "../../components/Card/CharacterCard.jsx";
import { PageContext } from "../Context.jsx";
import { Skeleton } from "antd";

const List = () => {
    const [characters, setcharacter] = useState([])
    const [numberPages, setNumberPages] = useState()
    const [numberCurrentPage, setNumberCurrentPage] = useState(1)
    const { page, setPage } = useContext(PageContext)
    const navigate = useNavigate()


    const handleNavigate = (id) => {
        return navigate(`/character/${id}`)
    }

    const pickPageNumber = (pagina) => parseInt(pagina.slice(-2)) > 9 ? pagina.slice(-2) : pagina.slice(-1)


    const getCharacters = useCallback(async (pagina) => {
        try {
            const response = await axios.get(pagina)
            setTimeout(() => {
                setcharacter(response.data.results)

            }, 2000)
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
                    <Skeleton title={false} paragraph={{rows: 20}} loading={!characters.length} active >
                        {characters.map((item) => (
                            <CharacterCard item={item} handleNavigate={handleNavigate} key={item.id} />
                        ))}
                    </Skeleton>

                </section>
                <div className={styles.container_footer}>
                    <button style={numberCurrentPage == 1 ? { opacity: "0" } : { opacity: "100%" }} className={styles.btn} onClick={prevPage}><img src="imgs/prev.svg" alt="" /></button>
                    <p>{`${numberCurrentPage}/${numberPages}`}</p>
                    <button style={numberCurrentPage == numberPages ? { opacity: "0" } : { opacity: "100%" }} className={styles.btn} onClick={nextPage}><img src="imgs/confirm.svg" alt="" /></button>
                </div>

            </section>

        </div>
    );
}

export default List;