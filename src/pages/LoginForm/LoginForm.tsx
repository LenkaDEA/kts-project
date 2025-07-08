import React, { useEffect, useState } from 'react';
import rootStore from 'stores/global';
import styles from './LoginForm.module.scss'
import Input from 'components/Input';
import Button from 'components/Button';
import { Link, useNavigate } from 'react-router-dom';
import Text from 'components/Text';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';
import { Meta } from 'utils/meta';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        autorun(() => {
            if (rootStore.auth.initialization) {
                navigate('/my');
            }
        })
    }, [rootStore.auth.initialization]);

    const handleSubmit = ((event: React.FormEvent) => {
        event.preventDefault();
        rootStore.auth.getAuth({ email, pass: password });
    });

    return (
        <div className={styles.login}>
            <Text view='p-20' weight='bold'>Sign in to Food Client</Text>
            <form className={styles.login__form}
                onSubmit={handleSubmit}>
                <div className={styles.login__form_input}>
                    <Input
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(val: string) => { setEmail(val) }}>
                    </Input>
                    {rootStore.auth.meta === Meta.error && <Text className={styles.login__form_input_error}>Incorrect email</Text>}
                </div>

                <div className={styles.login__form_input}>
                    <Input
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={(val: string) => { setPassword(val) }}>
                    </Input>
                    {rootStore.auth.meta === Meta.error && <Text className={styles.login__form_input_error}>Invalid password</Text>}
                </div>

                <Button
                    type="submit"
                >
                    Login
                </Button>
            </form>
            {/* <Button onClick={rootStore.auth.getRegisterAuth}>Reg</Button> */}
            <Link to="/registration">
                Registration
            </Link>
        </div>

    );
};

export default observer(LoginForm);