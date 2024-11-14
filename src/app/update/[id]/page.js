'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { set } from 'mongoose';

const UpdatePage = ({ params }) => {
    const [topice, setTopice] = useState(null);
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState(0);
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
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
                alert('Item updated successfully');
                router.push('/');
            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div>
            {topice ? (
                <>
                    <h2>Update {topice.title}</h2>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Update Title"
                    />
                    <input 
                        type="number" 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder='Updata question'
                    />
                    <button onClick={handleUpdate}>Save Changes</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdatePage;
