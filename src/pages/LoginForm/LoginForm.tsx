import React, { useState } from 'react';
import rootStore from 'stores/global';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={() => { rootStore.auth.getAuth() }} type="submit">Login</button>
        </form>
    );
};

export default LoginForm;