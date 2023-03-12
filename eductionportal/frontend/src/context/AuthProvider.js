import React, { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(
        // {"id":1,"firstName":"Abhi","lastName":"Kamble","email":"abhi@gmail.com","password":"root","courses":[{"id":1,"title":"Java","startDate":"2015-12-12","endDate":"2016-12-12","capacity":30,"contents":[]},{"id":2,"title":"Java 2","startDate":"2023-03-01","endDate":"2023-03-09","capacity":30,"contents":[{"id":1,"contentName":"Google Web","link":"google.com"},{"id":2,"contentName":"Google Web","link":"google.com"},{"id":3,"contentName":"Google Web","link":"googleeeeee.com"},{"id":4,"contentName":"new","link":"tttt.com"},{"id":5,"contentName":"new","link":"tttt.com"}]},{"id":3,"title":"Java 3","startDate":"2023-03-02","endDate":"2023-03-16","capacity":20,"contents":[]},{"id":4,"title":"Java 4","startDate":"2023-03-09","endDate":"2023-03-10","capacity":20,"contents":[]},{"id":5,"title":"Java 5","startDate":"2023-03-01","endDate":"2023-03-04","capacity":34,"contents":[]},{"id":6,"title":"er","startDate":"2023-03-01","endDate":"2023-03-04","capacity":22,"contents":[]}]}
    );
    const [toastFun, setToastFun] = useState(null);
    const [drawerStatus, setDrawerStatus] = useState(false);

    return (
        <AuthContext.Provider value={{auth, setAuth, toastFun, setToastFun, drawerStatus, setDrawerStatus }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;