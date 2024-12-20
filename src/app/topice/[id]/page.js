// app/topice/[id]/page.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../../components/Modal';
import CommentSection from '../../components/CommentSection';

const TopicePage = ({ params }) => {
    const [topice, setTopice] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [evaluations, setEvaluations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const router = useRouter();
    const id = Number(params.id);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/topices/${params.id}`);
            if (response.ok) {
                const data = await response.json();
                setTopice(data);
            } else {
                console.error('Failed to fetch topic');
                router.push('/');
            }

            const answerListResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/answers`);
            if(answerListResponse.ok) {
                const answerListData = await answerListResponse.json();
                const currentPageData = answerListData.find(data => data.id === id);
                if(currentPageData && currentPageData.id === id) {
                    setAnswers(currentPageData.answers);
                }
            } else {
                console.error('Failed to fetch answers');
            }
        };

        fetchData();
    }, [params.id, router]);

    useEffect(() => {
        if (answers.length > 0) {
            setEvaluations(
                answers.map(() => ({ correct: null }))
            );
        }
    }, [answers]);

    const calc = () => {
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

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const scoreCalc = (index, value) => {
        setEvaluations(prevEvaluation => {
            const updateEvaluation = [...prevEvaluation];
            updateEvaluation[index] = {
                ...updateEvaluation[index],
                correct: value,
            };
            return updateEvaluation;
        });
    };

    const handleInputChange = (index, field, value) => {
        setAnswers(prevAnswers => {
            const updateAnswers = [...prevAnswers];
            updateAnswers[index] = {
                ...updateAnswers[index],
                [field]: value,
            }
            return updateAnswers;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/answers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, answers }),
            });
    
            if (response.ok) {
                setModalMessage('답안이 성공적으로 저장되었습니다.');
            } else {
                setModalMessage('답안을 저장하는데 실패하였습니다. 다시 시도해주세요.');
                console.error('답안 저장 실패:', response.statusText);
            }
        } catch (error) {
            setModalMessage('서버와의 통신 중 오류가 발생하였습니다. 다시 시도해주세요.');
            console.error('서버와의 통신 중 오류 발생:', error);
        }

        setIsModalOpen(true);
    };

    let questions = [];

    if (topice && topice.questions) {
        for(let i = 0; i < topice.questions; i++) {
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
                            onChange={(e) => handleInputChange(i, 'question', e.target.value)}
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
                            onChange={(e) => handleInputChange(i, 'answer', e.target.value)}
                        />
                    </p>
                    <div className='correctBtn'>
                        <button 
                            className={`correct ${evaluations[i]?.correct && evaluations[i]?.correct === 'O' ? 'green' : evaluations[i]?.correct === 'X' ? 'red' : 'initial'}`}
                            type='button' 
                            onClick={() => scoreCalc(i, 'O')} 
                            value='O'
                        >
                            O
                        </button>
                        <button
                            className={`rong ${evaluations[i]?.correct && evaluations[i]?.correct === 'O' ? 'green' : evaluations[i]?.correct === 'X' ? 'red' : 'initial'}`}
                            type='button' 
                            onClick={() => scoreCalc(i, 'X')} 
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
        <div className="topiceAndComment">
            <div className='topiceContainer'>
                {topice ? (
                    <>
                        <h2>{topice.title}</h2>
                        <form onSubmit={handleSubmit}>
                            {questions}
                            <div className="buttonContainer">
                                <button className='calcBtn' type="button" onClick={calc}>계산</button>
                                <button className='submitBtn' type="submit">제출</button>
                            </div>
                        </form>
                        {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
                    </>
                ) : (
                    <p>Loading...</p>
                    )}
            </div>
            <div className="commentConainer">
                {topice ? (
                        <CommentSection topiceId={topice.id} />
                    ) : (
                        <p>Loading...</p>
                    )
                }
            </div>
        </div>
    );
};

export default TopicePage;
