import { useState } from 'react';

export const useForm = <T>(initialValues: T) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };

    return {
        formData,
        handleChange,
    };
}