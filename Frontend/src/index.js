import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './cotenxt_store/auth_context';
import { EmpContextProvider } from './cotenxt_store/emp_context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <EmpContextProvider>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </EmpContextProvider>

    </React.StrictMode>
);


