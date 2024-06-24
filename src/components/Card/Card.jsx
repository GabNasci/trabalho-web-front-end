import styles from "./Card.module.css"

const Card = ({ item, handleNavigate }) => {

    return (
        <div onClick={() => handleNavigate(item.id)} className={styles.card}>
            <div className={styles.card_header}>
                <h1>{item.name}</h1>
            </div>
            <div className={styles.card_body}>
                <img src={item.image} alt={`image of ${item.name}`} />
                <div className={styles.card_section}>
                    <div className={styles.infos}>
                        <div>
                            <p>Gender:</p>
                            <p>{item.gender}</p>
                        </div>
                        <div>
                            <p>Species:</p>
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