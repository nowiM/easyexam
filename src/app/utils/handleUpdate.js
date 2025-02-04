const handleUpdate = async (id, router, title, questions, startTransition) => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/topices/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, questions }),
        });

        startTransition(() => {
            router.push(`/topice/${id}`); // 업데이트된 페이지로 이동
        });
    } catch (error) {
        console.error('Error updating item:', error);
    }
};

export default handleUpdate;