import React, { PropsWithChildren } from 'react'

const App = React.memo((props: PropsWithChildren) => {
    return props.children
});

export default App;