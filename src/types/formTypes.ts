export interface IRegisterFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    retypePassword: string;
}

export interface FormErrors {
    [key: string]: string;
}


export interface ILoginFormValues {
    email: string;
    password: string;
}