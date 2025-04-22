import React from "react";

import styles from './Pagination.module.scss'

export type PaginationProps = {
    currentPage: number;
    pageCount: number;
    onPageChange: (newPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, pageCount, onPageChange }) => {
    const generatePageNumbers = () => {
        if (pageCount <= 1) return [];

        const pages = new Set<number>();
        pages.add(1);
        pages.add(pageCount);

        if (currentPage > 1) {
            pages.add(currentPage - 1);
        }
        pages.add(currentPage);
        if (currentPage < pageCount) {
            pages.add(currentPage + 1);
        }

        const sorted = Array.from(pages).sort((a, b) => (a - b));
        const result: (number | string)[] = [];

        sorted.forEach((page, i) => {
            if ((i > 0) && (page - sorted[i - 1] > 1)) {
                result.push('...');
            }
            result.push(page);
        });

        return result;
    };

    return (
        <div className={styles[`pagination`]}>
            {generatePageNumbers().map((num, i) =>
                num === '...' ? (<div key={`dots-${i}`} className={styles[`pagination__dots`]}>...</div>) :
                    (<div
                        key={num}
                        className={currentPage === num ? styles[`pagination__active`] : styles[`pagination__page`]}
                        onClick={() => onPageChange(num as number)}
                    >
                        {num}
                    </div>)
            )}
        </div>
    );
};

export default Pagination
