'use client'
import { useEffect, useState } from 'react';
import Modal from '../Modal';
import CommentSection from '../CommentSection';
import scoresCalc from '../../utils/TopicPage/scoresCalc'
import closeModal from '../../utils/TopicPage/closeModal'
import questionsTemplate from '../../utils/TopicPage/questionsTemplate'
import handleSubmit from '../../utils/TopicPage/handleSubmit'

const AnswersForm = ({ topiceData, answerData }) => {
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

    return (
        <>
            <div className='topiceContainer'>
                <h2>{topiceData.title}</h2>
                <form onSubmit={(e) => handleSubmit(e, topiceData.id, answers, setIsModalOpen, setModalMessage)}>
                    {questionsTemplate(topiceData, answers, evaluations, setAnswers, setEvaluations)}
                    <div className="buttonContainer">
                        <button 
                            className='calcBtn' 
                            type="button" 
                            onClick={() => scoresCalc(evaluations,topiceData, setIsModalOpen, setModalMessage)}
                        >계산</button>
                        <button className='submitBtn' type="submit">제출</button>
                    </div>
                </form>
                {isModalOpen && <Modal message={modalMessage} onClose={() => closeModal(setIsModalOpen)} />}
            </div>
            <div className="commentConainer">
                <CommentSection topiceId={topiceData.id} />
            </div>
        </>
    );
}

export default AnswersForm;