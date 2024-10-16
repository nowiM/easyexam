// app/test/[id]/page.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TestPage = ({ params }) => {
    const [topice, setTopice] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/topices/${params.id}`);
            if (response.ok) {
                const data = await response.json();
                setTopice(data);
            } else {
                console.error('Failed to fetch topic');
                router.push('/'); // 만약 데이터를 찾지 못하면 홈으로 이동
            }
        };
        
        fetchData();
    }, [params.id, router]);

    // 조건부 렌더링을 통해 topice가 null이 아닐 때만 questions를 생성합니다.
    let questions = [];
    if (topice && topice.questions) {
        for(let i = 0; i < topice.questions; i++) {
            questions.push(
                <div 
                    key={i}
                    className='question' 
                    style={{
                        width: '100px',
                        height: '100px',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        margin: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        color: '#333'
                    }}
                >
                </div>
            )
        }
    }

    return (
        <div>
            {topice ? (
                <>
                    <h2>{topice.title}</h2>
                    {questions.map(question => question)}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TestPage;
