import styles from "../styles/Pagination.module.css";

type PaginationProps = { pageNumber: number, previous?: number, next?: number, onClick: Function }

const Pagination = ({ pageNumber, previous, next, onClick }: PaginationProps) => {
    return (
        <div className={styles.paginationContainer}>
            <button className={previous?styles.active:styles.inactive} onClick={()=>previous&&onClick("prev")}>Previous</button>
            <div className={styles.active}>{pageNumber}</div>
            <button className={next?styles.active:styles.inactive} onClick={()=>next&&onClick("next")}>Next</button>
        </div>
    )
}

export default Pagination
