import { useState } from "react";
import { getCharacters } from "../graphql/queries";
import { characterType } from "../interfaces/character";
import styles from "../styles/Tables.module.css";
import Pagination from "./pagination";
import Image from "next/image";

type CharactersListProps = { characters: [characterType], previous?: number, next?: number, characterSelect: Function }

export default function CharactersList({ characters, previous, next, characterSelect }: CharactersListProps): JSX.Element {
    const [charactersList, setCharactersList] = useState(characters);
    const [previousPage, setPreviousPage] = useState(previous);
    const [nextPage, setNextPage] = useState(next);
    const [activePage, setActivePage] = useState(1);

    const handlePageClick = async (button: string) => {
        let newPage = activePage

        if(button === "prev"){
            newPage = activePage - 1;
        }else{
            newPage = activePage + 1;
        }

        const { data } = await getCharacters(newPage);
        setCharactersList(data.getPeople.results)
        setNextPage(data.getPeople.next)
        setPreviousPage(data.getPeople.previous)
        setActivePage(newPage)
    }

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <div className={styles.heading_name}>
                    <div>Name</div>
                </div>

                <div className={styles.heading_population}>
                    <div>Height</div>
                </div>

                <div className={styles.heading_population}>
                    <div>Mass</div>
                </div>

                <div className={styles.heading_releaseDate}>
                    <div> Gender </div>
                </div>

                <div className={styles.heading_onlineOnly}>
                    <div>Home World</div>
                </div>
            </div>

            {charactersList.map((character: characterType, index) => (
                <div className={styles.row} key={index} onClick={()=>characterSelect(character)}>
                    <div className={styles.name}>{character.name}</div>

                    <div className={styles.type}>{character.height}</div>

                    <div className={styles.type}>{character?.mass}</div>

                    <div className={styles.releaseDate}>{character?.gender}</div>

                    <div className={styles.onlineOnly}>{character?.homeworld} </div>
                </div>
            ))}

            <Pagination pageNumber={activePage} previous={previousPage} next={nextPage} onClick={handlePageClick}/>
            <Image src={"/sword.jpeg"} width={60} height={60}/>
        </div>
    );
}
