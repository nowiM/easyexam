import { useEffect, useState } from 'react';
import Modal from '../Modal';
import CommentSection from '../CommentSection';
import scoresCalc from '../../utils/TopicPage/scoresCalc';
import handleSubmit from '../../utils/TopicPage/handleSubmit';
import QuestionsForm from './QuestionsForm';
import useAnswersStore from '../../store/useAnswersStore';

const AnswersForm = ({ topiceData, answerData }) => {
    const { setAnswers, setEvaluations, evaluations } = useAnswersStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        setAnswers(answerData?.answers || []);
    }, [answerData, setAnswers]);

    useEffect(() => {
        if (answerData?.answers?.length > 0) {
            setEvaluations(answerData.answers.map(() => ({ correct: null })));
        }
    }, [answerData, setEvaluations]);

    return (
        <>
            <div className='topiceContainer'>
                <h2>{topiceData.title}</h2>

                <form 
                    onSubmit={(e) => 
                        handleSubmit(
                            e, 
                            topiceData.id, 
                            useAnswersStore.getState().answers, 
                            setIsModalOpen, 
                            setModalMessage
                        )
                    }
                >
                    {/* 문제와 답안 입력 및 점수 점수 계산을 위한 평가 폼*/}
                    <QuestionsForm topiceData={topiceData} />

                    {/* 버튼 영역 */}
                    <div className="buttonContainer">
                        <button 
                            className='calcBtn' 
                            type="button" 
                            onClick={() => 
                                scoresCalc(
                                    evaluations, 
                                    topiceData, 
                                    setIsModalOpen, 
                                    setModalMessage
                                )
                            }
                        >   
                            계산
                        </button>

                        <button className='submitBtn' type="submit">제출</button>
                    </div>
                </form>
                {isModalOpen && (
                    <Modal 
                        message={modalMessage} 
                        onClose={() => setIsModalOpen(false)} 
                    />
                )}
            </div>

            {/* 댓글 영역 */}
            <div className="commentContainer">
                <CommentSection topiceId={topiceData.id} />
            </div>
        </>
    );
}

export default AnswersForm;
