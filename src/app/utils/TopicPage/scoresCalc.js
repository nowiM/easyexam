const scoresCalc = (evaluations, topice) => {
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

    return {
        right,
        wrong,
        notCheck,
        sum,
        totalQuestions: topice.questions
    };
};

export default scoresCalc;
