import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient.js";

const Table = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        apiClient
            .get("/api/users")
            .then((users) => setUsers(users.data.data))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div className="relative overflow-x-auto border-2 p-4 rounded">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="border-b text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">{user.email}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
