import React, { useEffect, useState } from "react";
import styles from "./RegForm.module.scss"
import Text from "components/Text";
import Input from "components/Input";
import Button from "components/Button";
import { Link, useNavigate } from "react-router-dom";
import rootStore from "stores/global";
import { autorun } from "mobx";
import { Meta } from "utils/meta";
import { observer } from "mobx-react-lite";

const RegForm: React.FC = () => {
    const [userName, setUserName] = useState('');
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

    const handleSubmit = () => {
        console.log("Submit form", userName, email, password);

        rootStore.auth.getRegisterAuth({ email: email, login: userName, pass: password });
    };

    return <>
        <div className={styles.reg}>
            <form
                className={styles.reg__form}
                onSubmit={handleSubmit}>
                <Text view='p-20' weight='bold'>Registration</Text>
                <Input
                    className={styles.reg__form_input}
                    type="text"
                    value={userName}
                    placeholder="User name"
                    onChange={(value: string) => { setUserName(value) }}
                ></Input>

                <Input
                    className={styles.reg__form_input}
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(value: string) => { setEmail(value) }}
                ></Input>

                <Input
                    className={styles.reg__form_input}
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(value) => { setPassword(value) }}
                ></Input>

                {rootStore.auth.meta === Meta.error && <Text className={styles.reg__form_input_error}>Such a User already exists</Text>}

                <Button type="submit"
                    disabled={(userName && email && password) ? false : true}
                >Create user</Button>
            </form>

            <Link to="/login" onClick={() => { rootStore.auth.resetMeta() }}>Back to login</Link>

        </div>


    </>
};

export default observer(RegForm);