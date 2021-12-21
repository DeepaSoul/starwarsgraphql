import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { characterType } from '../interfaces/character'
import { getChracterQuery } from '../graphql/queries';
import styles from "../styles/CharacterPage.module.css";
import Image from 'next/image';

type CharacterProps = { character: characterType, backPress: Function }

const Character = ({ character, backPress }: CharacterProps) => {
    const { data, loading, error } = useQuery(getChracterQuery(character.name));

    if (error) {
        console.error(error);
        return null;
    }

    return (
        <div className={styles.mainContainer} >
            <div className={styles.mainOverlay}>
                {!loading &&
                    <div className={styles.wrapper}>
                        <div className={styles.scrollText}>
                            <h1>STAR WARS</h1>
                            <h2>{data?.getPerson?.results[0].name}</h2>
                            <p>Birth Year <span>{data?.getPerson?.results[0].birth_year}</span></p>
                            <p>Height <span>{data?.getPerson?.results[0].height}!</span></p>
                            <p>Total Films <span>{data?.getPerson?.results[0].films.length}</span></p>
                            <button onClick={() => backPress(null)}>Back</button>
                        </div>
                    </div>
                }
                <div style={{position:"fixed"}}><Image src={"/vader_2.jpeg"} width={"100%"} height={"100%"}/></div>
            </div>
        </div>
    )
}

export default Character
