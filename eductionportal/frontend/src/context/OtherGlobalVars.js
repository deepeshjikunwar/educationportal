import React, { createContext, useState } from "react";

const UtilContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    return (
        <AuthContext.Provider value={{auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default UtilContext;