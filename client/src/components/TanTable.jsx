import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
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

    useEffect(() => {
        apiClient.get('/api/users').then(({data}) => setData(data.data))
    }, [])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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
        </div>
    );
}

export default TanTable;
