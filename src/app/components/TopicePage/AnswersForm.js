import { useEffect, useState } from 'react';
import Modal from '../Modal';
import CommentSection from '../CommentSection';
import QuestionsForm from './QuestionsForm';
import useAnswersStore from '../../store/useAnswersStore';


const AnswersForm = ({ topiceData, answerData }) => {
    const { 
        initializeAnswers, 
        isModalOpen, 
        modalMessage, 
        submitAnswersAndShowModal, 
        calculateScoreAndShowModal, 
        closeModal 
    } = useAnswersStore();

    useEffect(() => {
        initializeAnswers(answerData); 
    }, [answerData, initializeAnswers]);

    return (
        <>
            <div className='topiceContainer'>
                <h2>{topiceData.title}</h2>

                <form 
                    onSubmit={(e) => submitAnswersAndShowModal(e, topiceData.id)}>
                    {/* 문제와 답안 입력 및 점수 점수 계산을 위한 평가 폼*/}
                    <QuestionsForm topiceData={topiceData} />

                    {/* 버튼 영역 */}
                    <div className="buttonContainer">
                        <button 
                            className='calcBtn' 
                            type="button" 
                            onClick={() => calculateScoreAndShowModal(topiceData)}
                        >   
                            계산
                        </button>

                        <button className='submitBtn' type="submit">제출</button>
                    </div>
                </form>
                {isModalOpen && (
                    <Modal 
                        message={modalMessage} 
                        onClose={closeModal}
                    />
                )}
            </div>

            {/* 댓글 영역 */}
            <div className="commentConainer">
                <CommentSection topiceId={topiceData.id} />
            </div>
        </>
    );
}

export default AnswersForm;
