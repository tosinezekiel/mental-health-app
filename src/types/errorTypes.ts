export interface ErrorDetail {
    name: string;
    message: string;
}

export interface ErrorObject {
    [key: string]: ErrorDetail;
}