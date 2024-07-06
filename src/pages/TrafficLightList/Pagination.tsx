import React from "react";
import { LeftIcon, RightIcon } from "../../components/icons";
import styles from "./list.module.css";
interface PaginationProps {
  page: number;
  rowsPerPage: number;
  totalLights: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Pagination({
  page,
  rowsPerPage,
  totalLights,
  ...props
}: PaginationProps) {
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <div className="d-flex flex-row justify-content-end align-items-center col-12 gap-3">
      <label className="form-label m-o p-0">Rows Per Page</label>
      <select
        className="form-select-sm h-10"
        value={rowsPerPage}
        onChange={props.onRowsPerPageChange}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
      <p className="m-0">
        Showing {startIndex + 1} to {Math.min(endIndex, totalLights)} of{" "}
        {totalLights}
      </p>
      <button
        className={page === 0 ? styles.iconButtonDisabled : styles.iconButton}
        disabled={page === 0}
        onClick={() => props.onPageChange(page - 1)}
      >
        <LeftIcon className={styles.icon} size={20} />
      </button>
      <button
        className={
          endIndex >= totalLights
            ? styles.iconButtonDisabled
            : styles.iconButton
        }
        disabled={endIndex >= totalLights}
        onClick={() => props.onPageChange(page + 1)}
      >
        <RightIcon className={styles.icon} size={20} />
      </button>
    </div>
  );
}

export default Pagination;
