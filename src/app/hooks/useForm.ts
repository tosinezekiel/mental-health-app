import { useState } from 'react';

export const useForm = <T>(initialValues: T) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    return {
        values,
        handleChange,
        resetForm
    };
}