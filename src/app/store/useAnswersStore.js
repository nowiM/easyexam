import { create } from 'zustand';

const useAnswersStore = create((set) => ({
    answers: [],
    evaluations: [],

    setAnswers: (answers) => set({ answers }),

    handleInputChange: (index, field, value) =>
        set((state) => {
            const updatedAnswers = [...state.answers];
            updatedAnswers[index] = {
                ...updatedAnswers[index],
                [field]: value,
            };
            return { answers: updatedAnswers };
        }),

    evaluateAnswer: (index, value) =>
        set((state) => {
            const updatedEvaluations = [...state.evaluations];
            updatedEvaluations[index] = {
                ...updatedEvaluations[index],
                correct: value,
            };
            return { evaluations: updatedEvaluations };
        }),

    setEvaluations: (evaluations) => set({ evaluations }),
}));

export default useAnswersStore;
