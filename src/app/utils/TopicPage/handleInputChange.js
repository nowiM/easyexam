const handleInputChange = (index, field, value, setAnswers) => {
    setAnswers(prevAnswers => {
        const updateAnswers = [...prevAnswers];
        updateAnswers[index] = {
            ...updateAnswers[index],
            [field]: value,
        }
        return updateAnswers;
    });
};

export default handleInputChange;