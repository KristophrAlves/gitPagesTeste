import React from 'react';
import GlobalStyle from './styles/global';
import RoutesApp from './routes';
import { AuthProvider } from './contexts/auth';

const App = () => {
    return (
        <AuthProvider>
            <GlobalStyle >
                <RoutesApp />
            </GlobalStyle>
        </AuthProvider>
    );
}

export default App;