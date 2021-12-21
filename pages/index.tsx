import Head from "next/head";
import styles from "../styles/Home.module.css";
import CharactersList from "../components/charactersList";
import { getCharacters } from "../graphql/queries";
import { InferGetServerSidePropsType } from "next";
import { characterType } from "../interfaces/character";
import { useState } from "react";
import Character from "../components/character";

export default function Home({ characters, next, previous }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [selectedCharacter, setSelectedCharacter] = useState<characterType | null>(null);

  const onCharacterSelect = (character: characterType) => {
    setSelectedCharacter(character)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Home - Star Wars GraphQl</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Star Wars</h1>
        {selectedCharacter && <Character character={selectedCharacter} backPress={onCharacterSelect}/>}
        {!selectedCharacter && <CharactersList characters={characters} next={next} previous={previous} characterSelect={onCharacterSelect}/>}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/DeepaSoul"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" Simphiwe Zulu"}
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = (await getCharacters(1));
  console.log(data)
  return {
    props: {
      characters: data.getPeople.results,
      next: data.getPeople.next,
      previous: data.getPeople.previous
    },
  };
}
