import { useState, useCallback } from 'react';
import { z, ZodError } from 'zod';
import { ErrorObject } from '~/types/errorTypes';


export const useFormValidation = <TFormData>(schema: z.ZodType<TFormData, any, any>) => {

  const [validationErrors, setValidationErrors] = useState<ErrorObject>({});

  const validate = useCallback((formData: TFormData) => {
    try {
      schema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        error.issues.forEach((issue) => {
          const { path, message } = issue;
          if(typeof path[0] == 'string'){
            const key: string = path[0];
            setValidationErrors(prevErrors => ({
                ...prevErrors,
                [key]: { name: key, message }
            }));
          }
        });

        return false;
      }
    }
  }, [schema]);

  const clearValidationErrors = () => {
        setValidationErrors({});
  }

  return { validationErrors, validate, clearValidationErrors };
}
