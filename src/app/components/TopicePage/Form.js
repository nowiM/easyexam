'use client'
import { useEffect, useState } from 'react';
import Modal from '../Modal';
import CommentSection from '../CommentSection';
import calc from '../../utils/TopicPage/calc'
import closeModal from '../../utils/TopicPage/closeModal'
import scoreCalc from '../../utils/TopicPage/scoreCalc'
import handleInputChange from '../../utils/TopicPage/handleInputChange'
import handleSubmit from '../../utils/TopicPage/handleSubmit'

const Form = ({ topiceData, answerData }) => {
    const [answers, setAnswers] = useState(answerData?.answers || []);
    const [evaluations, setEvaluations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        setAnswers(answerData?.answers || []);
    }, [answerData]);    

    useEffect(() => {
        if (answers.length > 0) {
            setEvaluations(
                answers.map(() => ({ correct: null }))
            );
        }
    }, [answers]);

    let questions = [];

    if (topiceData &&topiceData.questions) {
        for(let i = 0; i <topiceData.questions; i++) {
            questions.push(
                <div 
                    key={i}
                    className={`question ${evaluations[i]?.correct && evaluations[i]?.correct === 'O' ? 'green' : evaluations[i]?.correct === 'X' ? 'red' : 'initial'}`}
                >
                    <h3 className='askNum'>문항 {i + 1}</h3>
                    <p>
                        <label>시험 문제:</label>
                        <textarea 
                            type="text" 
                            className={`questionField ${evaluations[i]?.correct && evaluations[i]?.correct === 'O' ? 'green' : evaluations[i]?.correct === 'X' ? 'red' : 'initial'}`}
                            name={`question-${i}`} 
                            placeholder='시험 문제 입력'
                            value={answers[i]?.question || ''}
                            onChange={(e) => handleInputChange(i, 'question', e.target.value, setAnswers)}
                        />
                    </p>
                    <p>
                        <label>답안:</label>
                        <textarea 
                            type="text"
                            className={`answerField ${evaluations[i]?.correct && evaluations[i]?.correct === 'O' ? 'green' : evaluations[i]?.correct === 'X' ? 'red' : 'initial'}`}
                            name={`answer-${i}`} 
                            placeholder='답안 입력'
                            value={answers[i]?.answer || ''}
                            onChange={(e) => handleInputChange(i, 'answer', e.target.value, setAnswers)}
                        />
                    </p>
                    <div className='correctBtn'>
                        <button 
                            className={`correct ${evaluations[i]?.correct && evaluations[i]?.correct === 'O' ? 'green' : evaluations[i]?.correct === 'X' ? 'red' : 'initial'}`}
                            type='button' 
                            onClick={() => scoreCalc(i, 'O', setEvaluations)} 
                            value='O'
                        >
                            O
                        </button>
                        <button
                            className={`rong ${evaluations[i]?.correct && evaluations[i]?.correct === 'O' ? 'green' : evaluations[i]?.correct === 'X' ? 'red' : 'initial'}`}
                            type='button' 
                            onClick={() => scoreCalc(i, 'X', setEvaluations)} 
                            value='X'
                        >
                            X
                        </button>
                    </div>
                </div>
            );
        }
    }

    return (
        <>
            <div className='topiceContainer'>
                {topiceData ? (
                    <>
                        <h2>{topiceData.title}</h2>
                        <form onSubmit={(e) => handleSubmit(e, topiceData.id, answers, setIsModalOpen, setModalMessage)}>
                            {questions}
                            <div className="buttonContainer">
                                <button 
                                    className='calcBtn' 
                                    type="button" 
                                    onClick={() => calc(evaluations,topiceData, setIsModalOpen, setModalMessage)}
                                >계산</button>
                                <button className='submitBtn' type="submit">제출</button>
                            </div>
                        </form>
                        {isModalOpen && <Modal message={modalMessage} onClose={() => closeModal(setIsModalOpen)} />}
                    </>
                ) : (
                    <p>Loading...</p>
                    )}
            </div>
            <div className="commentConainer">
                {topiceData ? (
                        <CommentSection topiceId={topiceData.id} />
                    ) : (
                        <p>Loading...</p>
                    )
                }
            </div>
        </>
    );
}

export default Form;