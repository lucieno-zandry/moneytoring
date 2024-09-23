import React, { PropsWithChildren } from 'react'
import LogoutDialog from '../partials/LogoutDialog/LogoutDialog';
import { Toaster } from 'react-hot-toast';
import useRefreshAuth from '../core/hooks/useRefreshAuth';

const App = React.memo((props: PropsWithChildren) => {
    const refreshAuth = useRefreshAuth();
    React.useEffect(refreshAuth, []);

    return <>
        <LogoutDialog />
        <Toaster />
        {props.children}
    </>
});

export default App;