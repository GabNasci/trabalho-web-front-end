import { useState, useCallback, useEffect, useContext } from "react";
import styles from "./List.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import CharacterCard from "../../components/Card/CharacterCard.jsx";
import { PageContext } from "../Context.jsx";
import { Pagination } from "antd";

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
            const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${pagina}`)
            setcharacter(response.data.results)
            setNumberPages(response.data.info.pages)
            setNumberCurrentPage(page)
        } catch (error) {
            console.log(error)
        }
    }, [page])

    const handlePagination = async (pagina) => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${pagina}`)
            setcharacter(response.data.results)
            setPage(pagina)
            setNumberCurrentPage(pagina)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCharacters(page);
        console.log(page)
    }, [getCharacters])


    return (
        <div className={styles.container}>
            <section className={styles.container_body}>
                <div className={styles.container_header}>
                    <h1>target list_</h1>
                </div>
                <section className={styles.container_cards}>
                    {characters.map((item) => (
                        <CharacterCard item={item} handleNavigate={handleNavigate} key={item.id} />
                    ))}

                </section>
                <div className={styles.container_footer}>
                    <Pagination
                        simple
                        className={styles.paginator}
                        showSizeChanger={false}
                        defaultCurrent={page}
                        total={numberPages * 10}
                        onChange={handlePagination}
                    />
                </div>

            </section>

        </div>
    );
}

export default List;