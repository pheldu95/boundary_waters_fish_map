import axios from 'axios';
import React, { useState, type ChangeEvent, type FormEvent } from 'react'

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginFormErrors {
    email?: string;
    password?: string;
    general: string;
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

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        setIsLoading(true);
        setErrors({});

        try {
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

            console.log('Login successful:', response.data);

            const userIri = response?.headers['location'];

            // Handle successful login
            // if (response.data.token) {
            //     localStorage.setItem('authToken', response.data.token);
            //     // Redirect or update app state
            // }

        } catch (error) {
            console.error('Login error:', error);

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Server responded with error
                    const { status, data } = error.response;

                    if (status === 400) {
                        setErrors({ general: data.detail || 'Invalid request' });
                    } else if (status === 401) {
                        setErrors({ general: 'Invalid email or password' });
                    } else {
                        setErrors({ general: data.message || 'An error occurred during login' });
                    }
                } else if (error.request) {
                    // Request made but no response
                    setErrors({ general: 'Network error. Please check your connection.' });
                } else {
                    // Error in setting up the request
                    setErrors({ general: 'An unexpected error occurred' });
                }
            } else {
                setErrors({ general: 'An unexpected error occurred' });
            }
        } finally {
            setIsLoading(false);
        }
    };

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
