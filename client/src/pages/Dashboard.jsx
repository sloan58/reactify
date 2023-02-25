import AuthLayout from "../layout/AuthLayout.jsx";
import TanTable from "../components/TanTable.jsx";
import Table from "../components/Table.jsx";

const Dashboard = () => {
    return (
        <AuthLayout>
            <div className="w-2/3 mx-auto">
                <TanTable />
            </div>
        </AuthLayout>
    );
};

export default Dashboard;
