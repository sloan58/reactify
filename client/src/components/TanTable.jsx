import {
    createColumnHelper,
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import { useEffect, useState, useMemo, useReducer } from "react";
import apiClient from "../utils/apiClient.js";

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => (
            <span className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor((row) => row.email, {
        header: "Email",
    }),
];

function TanTable() {
    const [data, setData] = useState(() => []);

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        apiClient.get(`/api/users?page=${pageIndex + 1}&pageSize=${pageSize}`).then((res) => {
            setData(res.data);
        });
    }, [pageIndex, pageSize]);

    const defaultData = useMemo(() => [], [])

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    );

    const table = useReactTable({
        data: data.data ?? defaultData,
        columns,
        pageCount: data?.last_page ?? -1,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        debugTable: true,
    });

    return (
        <div className="relative overflow-x-auto border-2 p-4 rounded">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="border-b text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-6 py-3">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-6 py-4">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
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
            <pre>{JSON.stringify(pagination, null, 2)}</pre>
        </div>
    );
}

export default TanTable;
