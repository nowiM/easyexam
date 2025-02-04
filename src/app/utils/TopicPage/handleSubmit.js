const handleSubmit = async (e, id, answers, setIsModalOpen, setModalMessage) => {
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

export default handleSubmit;