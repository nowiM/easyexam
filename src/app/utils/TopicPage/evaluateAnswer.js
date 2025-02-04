const evaluateAnswer  = (index, value, setEvaluations) => {
    setEvaluations(prevEvaluation => {
        const updateEvaluation = [...prevEvaluation];
        updateEvaluation[index] = {
            ...updateEvaluation[index],
            correct: value,
        };
        return updateEvaluation;
    });
};

export default evaluateAnswer ;