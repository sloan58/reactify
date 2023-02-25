import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import Paginator from "./Paginator.jsx";
import { useEffect, useMemo, useState } from "react";
import apiClient from "../utils/apiClient.js";

function Table() {

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

    const [data, setData] = useState(() => []);

    const [{ pageIndex, pageSize }, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        apiClient
            .get(`/api/users?page=${pageIndex + 1}&pageSize=${pageSize}`)
            .then((res) => {
                console.log(res.data)
                setData(res.data);
            });
    }, [pageIndex, pageSize]);

    const defaultData = useMemo(() => [], []);

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
            <Paginator table={table} pagination={pagination} totalCount={data.total} />
        </div>
    );
}

export default Table;
