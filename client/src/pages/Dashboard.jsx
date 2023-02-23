import { useSanctum } from "react-sanctum";

const Dashboard = () => {
    const { signOut } = useSanctum();
    const handleLogout = () => {
        signOut()
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    };
    return (
        <div>
            <div>Dashboard</div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
