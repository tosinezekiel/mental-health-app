export type PreliminaryQuestionsType = {
    text: string;
    order: number;
    options?: Option[];
}


export type Option = {
    value: string;
    type: string;
}