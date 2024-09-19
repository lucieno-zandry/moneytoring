import React, { PropsWithChildren } from 'react'
import LogoutDialog from '../partials/LogoutDialog/LogoutDialog';
import { Toaster } from 'react-hot-toast';

const App = React.memo((props: PropsWithChildren) => {
    return <>
        <LogoutDialog />
        <Toaster />
        {props.children}
    </>
});

export default App;