import { useState, useCallback } from 'react';
import { useFormValidation } from "../hooks/useFormValidation";

export const useForm = <T extends Record<string, any>>(initialValues: T,
    onChangeCallback?: (name: string) => void) => {
    const [formData, setFormData] = useState<T>(initialValues);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (onChangeCallback) {
          onChangeCallback(name);
        }
      }, [onChangeCallback]);

    return {
        formData,
        handleChange,
    };
}