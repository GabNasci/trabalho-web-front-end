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
    );
}

export default Character;