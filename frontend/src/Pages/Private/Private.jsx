import { Navigate } from "react-router-dom";

function Private({ children }) {
    const token = localStorage.getItem("AltToken");
    return token ? children : <Navigate to="/Login" />;
}

export default Private;