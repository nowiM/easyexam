// app/test/[id]/page.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TestPage = ({ params }) => {
    const [topice, setTopice] = useState(null);
    const [answers, setAnswers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `api/topices/${params.id}`);
            if (response.ok) {
                const data = await response.json();
                setTopice(data);

                // 로컬 스토리지에서 저장된 답안 데이터 복원
                const savedAnswers = localStorage.getItem(`answers-${params.id}`);
                if (savedAnswers) {
                    setAnswers(JSON.parse(savedAnswers));
                } else {
                    setAnswers(Array.from({ length: data.questions }, () => ({ question: '', answer: '' })));
                }
            } else {
                console.error('Failed to fetch topic');
                router.push('/'); // 데이터를 찾지 못하면 홈으로 이동
            }
        };

        fetchData();
    }, [params.id, router]);

    // 입력값 변경 처리 함수
    const handleInputChange = (index, field, value) => {
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[index] = {
                ...updatedAnswers[index],
                [field]: value,
            };

            // 로컬 스토리지에 저장
            localStorage.setItem(`answers-${params.id}`, JSON.stringify(updatedAnswers));

            return updatedAnswers;
        });
    };

    // 제출 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("제출된 답안:", answers);

        // 필요 시 서버로 데이터 전송 또는 추가 처리
    };

    let questions = [];
    if (topice && topice.questions) {
        for(let i = 0; i < topice.questions; i++) {
            questions.push(
                <div 
                    key={i}
                    className='question' 
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        marginBottom: '10px',
                        backgroundColor: '#f9f9f9'
                    }}
                >
                    <h3>문항 {i + 1}</h3>
                    <p>
                        <label>시험 문제:</label>
                        <input 
                            type="text" 
                            name={`question-${i}`} 
                            placeholder='시험 문제 입력'
                            value={answers[i]?.question || ''}
                            onChange={(e) => handleInputChange(i, 'question', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginTop: '5px',
                                marginBottom: '10px'
                            }}
                        />
                    </p>
                    <p>
                        <label>답안:</label>
                        <input 
                            type="text" 
                            name={`answer-${i}`} 
                            placeholder='답안 입력'
                            value={answers[i]?.answer || ''}
                            onChange={(e) => handleInputChange(i, 'answer', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginTop: '5px'
                            }}
                        />
                    </p>
                </div>
            );
        }
    }

    return (
        <div>
            {topice ? (
                <>
                    <h2>{topice.title}</h2>
                    <form onSubmit={handleSubmit}>
                        {questions}
                        <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>제출</button>
                    </form>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TestPage;
