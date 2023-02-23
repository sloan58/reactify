import Navigation from "./Navigation.jsx";

const AuthLayout = ({ children }) => {
    return (
        <div>
            <Navigation />
            <div className="p-8">{children}</div>
        </div>
    );
};

export default AuthLayout;
