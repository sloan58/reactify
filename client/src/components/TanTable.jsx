import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useReducer, useState } from "react";

const defaultData = [
    {
        firstName: "tanner",
        lastName: "linsley",
        age: 24,
        visits: 100,
        status: "In Relationship",
        progress: 50,
    },
    {
        firstName: "tandy",
        lastName: "miller",
        age: 40,
        visits: 40,
        status: "Single",
        progress: 80,
    },
    {
        firstName: "joe",
        lastName: "dirte",
        age: 45,
        visits: 20,
        status: "Complicated",
        progress: 10,
    },
];

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("firstName", {
        header: "First Name",
        cell: (info) => (
            <span className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {info.getValue()}
            </span>
        ),
    }),
    columnHelper.accessor((row) => row.lastName, {
        header: "Last Name",
    }),
    columnHelper.accessor("age", {
        header: "Age",
    }),
    columnHelper.accessor("visits", {
        header: "Visits",
    }),
    columnHelper.accessor("status", {
        header: "Status",
    }),
    columnHelper.accessor("progress", {
        header: "Profile Progress",
    }),
];

function TanTable() {
    const [data, setData] = useState(() => [...defaultData]);

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
