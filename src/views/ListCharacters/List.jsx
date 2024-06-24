import { useState, useCallback, useEffect, useContext } from "react";
import styles from "./List.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import CharacterCard from "../../components/Card/CharacterCard.jsx";
import { PageContext } from "../Context.jsx";
import { Pagination, Skeleton } from "antd";

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

    const handlePagination = async (pagina) => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${pagina}`)
            setcharacter(response.data.results)
            setPage(`https://rickandmortyapi.com/api/character?page=${pagina}`)
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
                    <Skeleton size={"large"} title={false} paragraph={{rows: 20, height: 10}} loading={!characters.length} active >
                        {characters.map((item) => (
                            <CharacterCard item={item} handleNavigate={handleNavigate} key={item.id} />
                        ))}
                    </Skeleton>

                </section>
                <div className={styles.container_footer}>
                    <Pagination simple className={styles.paginator} showSizeChanger={false} defaultCurrent={numberCurrentPage} total={numberPages * 10} onChange={handlePagination} />
                </div> 

            </section>

        </div>
    );
}

export default List;