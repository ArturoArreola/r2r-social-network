import React, { useState, useEffect } from 'react';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from "./utils/context";
import { isUserLoggedInApi } from './api/auth';

export default function App() {

    const [user, setUser] = useState(null);
    const [loadUser, setLoadUser] = useState(false);
    const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

    useEffect(() => {
        setUser(isUserLoggedInApi());
        setRefreshCheckLogin(false);
        setLoadUser(true);
    }, [refreshCheckLogin]);

    if(!loadUser) return null;

    return(
        <AuthContext.Provider value={user}>
            {user ?
                (<h1>Logueado</h1>) :
                ( <div>
                    <WelcomePage setRefreshCheckLogin={setRefreshCheckLogin}/>
                  </div>
                )
            }

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </AuthContext.Provider>
    );
}
