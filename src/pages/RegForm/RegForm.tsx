import React, { useState } from "react";
import styles from "./RegForm.module.scss"
import Text from "components/Text";
import Input from "components/Input";
import Button from "components/Button";
import { Link } from "react-router-dom";

const RegForm: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log("Submit form", userName, email, password);
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

                <Button type="submit">Create user</Button>
            </form>

            <Link to="/login">Back to login</Link>


        </div>


    </>
};

export default RegForm;