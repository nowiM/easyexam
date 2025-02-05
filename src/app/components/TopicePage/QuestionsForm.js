import React from 'react';
import useAnswersStore from '../../store/useAnswersStore';

// 평가 결과에 따른 CSS 클래스 반환 함수
const getEvaluationClass = (evaluation) => {
    if (evaluation?.correct === 'O') return 'green';
    if (evaluation?.correct === 'X') return 'red';
    return 'initial';
};

const QuestionsForm = ({ topiceData }) => {
    const { answers, evaluations, handleInputChange, evaluateAnswer } = useAnswersStore();

    if (!topiceData || !topiceData.questions) return null;

    return (
        <>
            {Array.from({ length: topiceData.questions }).map((_, i) => {
                const evaluationClass = getEvaluationClass(evaluations[i]);

                return (
                    <div key={i} className={`question ${evaluationClass}`}>
                        <h3 className='askNum'>문항 {i + 1}</h3>
                        <p>
                            <label>시험 문제:</label>
                            <textarea 
                                className={`questionField ${evaluationClass}`}
                                name={`question-${i}`} 
                                placeholder='시험 문제 입력'
                                value={answers[i]?.question || ''}
                                onChange={(e) => handleInputChange(i, 'question', e.target.value)}
                            />
                        </p>
                        <p>
                            <label>답안:</label>
                            <textarea 
                                className={`answerField ${evaluationClass}`}
                                name={`answer-${i}`} 
                                placeholder='답안 입력'
                                value={answers[i]?.answer || ''}
                                onChange={(e) => handleInputChange(i, 'answer', e.target.value)}
                            />
                        </p>
                        <div className='correctBtn'>
                            <button 
                                className={`correct ${evaluationClass}`}
                                type='button' 
                                onClick={() => evaluateAnswer(i, 'O')} 
                            >
                                O
                            </button>
                            <button
                                className={`rong ${evaluationClass}`}
                                type='button' 
                                onClick={() => evaluateAnswer(i, 'X')} 
                            >
                                X
                            </button>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default QuestionsForm;
