// app/test/[id]/page.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TestPage = ({ params }) => {
    const [topice, setTopice] = useState(null);
    const [answers, setAnswers] = useState([]);
    const router = useRouter();
    const id = Number(params.id); // 동적 라우팅의 [id]를 Number 타입으로 저장(데이터베이스에 저장된 id과 비교하기 위해)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `api/topices/${params.id}`);
            if (response.ok) {
                const data = await response.json();
                setTopice(data);
            } else {
                console.error('Failed to fetch topic');
                router.push('/'); // 데이터를 찾지 못하면 홈으로 이동
            }
            
            // 데이터베이스에서 저장된 답안 데이터 복원
            const answerListResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/answers`);
            const answerListData = await answerListResponse.json();
            const currentPageData = answerListData.find(data => data.id === id); // 데이터베이스 데이터 중 현재 페이지 필요한 데이터 추출

            // 데이터가 존재하고 currentPageData.id와 id가 같으면 setAnswer값을 저장
            if(currentPageData && currentPageData.id === id) {
                setAnswers(currentPageData.answers);
            }
        };

        fetchData();
    }, [params.id, router]);

    // 입력값 변경 처리 함수
    const handleInputChange = (index, field, value) => {
        setAnswers(prevAnswers => {
            const updateAnswers = [...prevAnswers];
            updateAnswers[index] = {
                ...updateAnswers[index],
                [field]: value,
            }

            return updateAnswers;
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // 제출된 답안 출력
        console.log("제출된 답안:", answers);
    
        try {
            // 서버로 POST 요청
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/answers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, answers }),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('답안이 성공적으로 저장되었습니다:', result);
            } else {
                console.error('답안 저장 실패:', response.statusText);
            }
        } catch (error) {
            console.error('서버와의 통신 중 오류 발생:', error);
        }
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
