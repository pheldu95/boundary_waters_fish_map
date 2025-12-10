import axios from 'axios';
import React, { useState, type ChangeEvent } from 'react'

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginFormErrors {
    email?: string;
    password?: string;
}

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<LoginFormErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Clear error for the field being edited
        if (errors[name as keyof LoginFormErrors]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: undefined
            }));
        }
    };

    const onSubmit = async () => {
        event.preventDefault();
        setIsLoading(true);

        const response = await axios.post(
            '/api/login',
            {
                email: formData.email,
                password: formData.password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(response.status);
        if (response.status !== 200) {
            const data = await response.data.json;
            setErrors(data.error);
            console.log(errors);
            return;
        }

        setIsLoading(false);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div >
    )
}
