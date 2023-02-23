import AuthLayout from "../layout/AuthLayout.jsx";
import Table from "../components/Table.jsx";

const Dashboard = () => {
    return (
        <AuthLayout>
            <div className="w-2/3 mx-auto">
                <Table />
            </div>
        </AuthLayout>
    );
};

export default Dashboard;
