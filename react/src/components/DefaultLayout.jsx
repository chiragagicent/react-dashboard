import { Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div>
            <div id="defaultLayout">
                <aside>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/users">Users</Link>
                </aside>
                <div className="content">
                    <header>
                        <div>Header</div>
                        <div>
                            {user.name}
                            <a
                                href="/logout"
                                onClick={onLogout}
                                className="btn-logout"
                            >
                                Logout
                            </a>
                        </div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </div>
                {notification && (
                    <div className="notification">{notification}</div>
                )}
            </div>
        </div>
    );
}
