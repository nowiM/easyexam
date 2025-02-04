const scoresCalc = (evaluations, topice, setIsModalOpen, setModalMessage) => {
    const right = evaluations.filter( // 정답
        evaluation => evaluation.correct === 'O'
    ).length; 

    const wrong = evaluations.filter( // 오답
        evaluation => evaluation.correct === 'X')
    .length; 

    const notCheck = evaluations // 체크하지 문항
        .map((evaluation, index) => !evaluation.correct ? index + 1 : null)
        .filter(index => index !== null); 

    const sum = right + wrong; // 전체 문항

    if(sum === 0) {
        setModalMessage('정답을 체크해주세요!!')
    } else if (sum < topice.questions) {
        setModalMessage(`체크하지 않은 문항이 있습니다. 체크하지 않은 문항: ${notCheck.join(', ')}`);
    } else {
        setModalMessage(`${topice.questions} 문제 중에 정답: ${right} 오답: ${wrong}`);
    }
    setIsModalOpen(true);
};

export default scoresCalc;
