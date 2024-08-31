import React, { PropsWithChildren } from 'react'
import { AuthProvider } from '../core/contexts/providers';

const App = React.memo((props: PropsWithChildren) => {
    
    return <AuthProvider>
        {props.children}
    </AuthProvider>
});

export default App;