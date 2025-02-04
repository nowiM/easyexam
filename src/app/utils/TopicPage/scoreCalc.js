const scoreCalc = (index, value, setEvaluations) => {
    setEvaluations(prevEvaluation => {
        const updateEvaluation = [...prevEvaluation];
        updateEvaluation[index] = {
            ...updateEvaluation[index],
            correct: value,
        };
        return updateEvaluation;
    });
};

export default scoreCalc;