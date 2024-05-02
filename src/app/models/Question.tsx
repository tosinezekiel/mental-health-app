export interface Question {
    questionId: string = "def";
    question: string;
    answerType: string;
    options: string[];
    categoryType?: string;
}

export interface Response {
    questionId: string,
    answers: string | string[],
}