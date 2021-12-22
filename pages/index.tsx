import Head from "next/head";
import styles from "../styles/Home.module.css";
import CharactersList from "../components/charactersList";
import { useQuery } from "@apollo/client";
import { getCharactersQuery } from "../graphql/queries";
import { characterType } from "../interfaces/character";
import { useState } from "react";
import Character from "../components/character";

export default function Home(): JSX.Element {
  const [selectedCharacter, setSelectedCharacter] = useState<characterType | null>(null);
  const [activePage, setActivePage] = useState(1);

  const { data, loading, error } = useQuery(getCharactersQuery(activePage));

  if (error) {
    console.error(error);
    return <div>Encountered error: {error}</div>;
  }

  if(loading){
    return <div>Loading.....</div>
  }

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
        {selectedCharacter && !loading && <Character character={selectedCharacter} backPress={onCharacterSelect} />}
        {!selectedCharacter && !loading && <CharactersList characters={data.getPeople.results} next={data.getPeople.next} previous={data.getPeople.previous} characterSelect={onCharacterSelect} activePage={activePage} setActivePage={setActivePage} />}
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

//Uncomment below code if want to use SSR
// export async function getServerSideProps() {
//   const { data } = (await getCharacters(1));
//   return {
//     props: {
//       characters: data.getPeople.results,
//       next: data.getPeople.next,
//       previous: data.getPeople.previous
//     },
//   };
// }
