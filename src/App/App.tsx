import React, { PropsWithChildren } from 'react'
import LogoutDialog from '../partials/LogoutDialog/LogoutDialog';

const App = React.memo((props: PropsWithChildren) => {
    return <>
        <LogoutDialog />
        {props.children}
    </>
});

export default App;