import React, { PropsWithChildren } from "react";
import { AuthContext } from "./contexts";
import { User } from "../config/types/models";
import { fakeUser } from "../config/constants/fakes";

export const AuthProvider = React.memo((props: PropsWithChildren) => {
    const [user, setUser] = React.useState(fakeUser as undefined | false | User);

    const value = React.useMemo(() => ({
        user,
        setUser
    }), [user]);
    

    return <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>
});