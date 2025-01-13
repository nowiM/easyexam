'use Clinet';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


const SubComponents = ({ id }) => {
    const [topice, setTopice] = useState(null);
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const router = useRouter();

    const fetchTopiceData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/topices/${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTopice(data);
                setTitle(data.title); // initialize title if applicable
                setQuestion(data.questions)
            } else {
                console.error('Failed to fetch topic');
            }
        } catch (error) {
            console.error('Error fetching topic:', error);
        }
    };
    
    useEffect(() => {
        fetchTopiceData();
    }, [id]);
    
    const handleUpdate = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/topices/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, question }), // example of updating the title
            });
    
            if (response.ok) {
                router.push(`/topice/${id}`); // 업데이트된 페이지로 이동
            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };
    
    return(
        <>
            <h2>시험과목 수정</h2>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="시험 과목을 수정해주세요."
            />

            <input 
                type="number" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                min={0}
                max={300}
                placeholder='시험 문제를 수정해주세요.'
            />

            <input 
                type="button" 
                value="Save" 
                onClick={handleUpdate}
            />
        </>
    )
}

export default SubComponents;