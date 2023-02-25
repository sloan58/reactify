import { usePagination, DOTS } from "../hooks/usePagination.jsx";

const Paginator = ({ table, totalCount, totalPageCount }) => {
    const paginationRange = usePagination({
        totalPageCount,
        totalCount,
        pageSize: 10,
        siblingCount: 3,
        currentPage: table.getState().pagination.pageIndex + 1,
    });

    return (
        <div className="mt-8">
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                    <li>
                        <button
                            className={`px-3 py-2 ml-0 leading-tight text-gray-500 border border-gray-300 rounded-l-lg ${
                                table.getCanPreviousPage()
                                    ? "bg-white dark:bg-gray-800"
                                    : "bg-gray-100 hover:text-gray-700"
                            } hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </button>
                    </li>
                    {paginationRange &&
                        paginationRange.map((pageNumber) => {
                            // If the pageItem is a DOT, render the DOTS unicode character
                            if (pageNumber === DOTS) {
                                return (
                                    <li key={pageNumber + 0}>
                                        <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                            &#8230;
                                        </button>
                                    </li>
                                );
                            }

                            // Render our Page Pills
                            return (
                                <li key={pageNumber + 0}>
                                    <button
                                        className={`px-3 py-2 leading-tight text-gray-500 border border-gray-300 ${
                                            table.getState().pagination
                                                .pageIndex +
                                                1 !==
                                            pageNumber
                                                ? "bg-white dark:bg-gray-800 hover:bg-gray-100 hover:text-gray-700"
                                                : "bg-blue-200 font-bold"
                                        } dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                                        onClick={() =>
                                            table.setPageIndex(pageNumber - 1)
                                        }
                                    >
                                        {pageNumber}
                                    </button>
                                </li>
                            );
                        })}
                    <li>
                        <button
                            className={`px-3 py-2 ml-0 leading-tight text-gray-500 border border-gray-300 rounded-r-lg ${
                                table.getCanNextPage()
                                    ? "bg-white dark:bg-gray-800"
                                    : "bg-gray-100 hover:text-gray-700"
                            } hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

            <div className="h-2" />
            <div className="flex items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<<"}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<"}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {">"}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {">>"}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[15, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div>{table.getRowModel().rows.length} Rows</div>
        </div>
    );
};

export default Paginator;
