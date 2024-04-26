export interface Question {
    questionId: string = "def";
    question: string;
    answerType: string;
    options: string[];
    categoryType?: string;
}