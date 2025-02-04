const calc = (evaluations, topice, setIsModalOpen, setModalMessage) => {
    const scoreO = evaluations.filter(evaluation => evaluation.correct === 'O').length;
    const scoreX = evaluations.filter(evaluation => evaluation.correct === 'X').length;
    const notCheck = evaluations.map((evaluation, index) => !evaluation.correct ? index + 1 : null).filter(index => index !== null);

    const sum = scoreO + scoreX;
    if(sum === 0) {
        setModalMessage('정답을 체크해주세요!!')
    } else if (sum < topice.questions) {
        setModalMessage(`체크하지 않은 문항이 있습니다. 체크하지 않은 문항: ${notCheck.join(', ')}`);
    } else {
        setModalMessage(`${topice.questions} 문제 중에 정답: ${scoreO} 오답: ${scoreX}`);
    }
    setIsModalOpen(true);
};

export default calc;
