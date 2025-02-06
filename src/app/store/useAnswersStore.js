import { create } from 'zustand';
import scoresCalc from '../utils/TopicPage/scoresCalc';
import handleSubmit from '../utils/TopicPage/handleSubmit';

const useAnswersStore = create((set) => ({
    answers: [],
    evaluations: [],
    isModalOpen: false,
    modalMessage: '',
    
    setAnswers: (answers) => set({ answers }),

    setEvaluations: (evaluations) => set({ evaluations }),

    openModal: (message) => set({ isModalOpen: true, modalMessage: message }),

    closeModal: () => set({ isModalOpen: false, modalMessage: '' }),

    // ✅ 상태 초기화
    initializeAnswers: (answerData) => {
        set({
            answers: answerData?.answers || [],
            evaluations: answerData?.answers?.length > 0 
                ? answerData.answers.map(() => ({ correct: null })) 
                : []
        });
    },

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

    submitAnswersAndShowModal: async (e, topiceId) => {
        const { success, message } = await handleSubmit(e, topiceId, useAnswersStore.getState().answers);
        set({ isModalOpen: true, modalMessage: message });
    },

    calculateScoreAndShowModal: (topiceData) => {
        set((state) => {
            const { right, wrong, notCheck, sum, totalQuestions } = scoresCalc(state.evaluations, topiceData);

            let message = '';
            if (sum === 0) {
                message = '정답을 체크해주세요!!';
            } else if (sum < totalQuestions) {
                message = `체크하지 않은 문항이 있습니다. 체크하지 않은 문항: ${notCheck.join(', ')}`;
            } else {
                message = `${totalQuestions} 문제 중에 정답: ${right} 오답: ${wrong}`;
            }

            return { isModalOpen: true, modalMessage: message };
        });
    },
}));

export default useAnswersStore;
