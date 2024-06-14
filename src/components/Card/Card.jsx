import styles from "./Card.module.css"

const Card = ({ item, handleNavigate }) => {
    return (
        <div onClick={() => handleNavigate(item.id)} className={styles.card}>
            <h1>{item.name}</h1>
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
    );
}

export default Card;