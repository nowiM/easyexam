'use client';
import Link from 'next/link';
import { useParams,useRouter } from 'next/navigation';

const Control = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    const handleDelete = async () => {
        // window.confirm은 확인(true)과 취소(false)가지는 모달창 => 반환 값은 ture or false
        const confirmDelete = window.confirm('진짜 삭제하시겠습니다?');

        if(!confirmDelete) {
            return; // 취소 시 아무 작업도 하지 않음
        }

        const options = {method: 'DELETE'};

        // AnswerList 모델에 삭제할려고하는 id가 존재하면 삭제한다.
        const answerResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/answers?id=${id}`, options);
        const answerDeleteResult = await answerResponse.json();
        console.log(answerDeleteResult);

        // 현재 [id]를 Topice 모델에서 id값과 일치하는 것을 삭제한다.
        const topicResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/topices/${id}`, options);
        if(topicResponse.ok) {
            router.push('/') // 홈으로 이동
            router.refresh(); // 페이지 새로고침
        } else {
            console.error('Failed to delete topic');
        }
    }

    return (
        <>
        <div className="createAndDelete">
            <div className="copy">Good Times is a practice that provides creative services and digital experiences for commercial and cultural clients to build meaningful brands</div>
            <ul className='controlList'>
                <li>
                    <Link href="/create">
                        <img className='controlImg' src="/images/create.svg" alt="" />
                        <span className='controlTitle'>Create</span>
                    </Link>
                </li>
                {id ? 
                    <>
                        <li>
                            <button onClick={handleDelete}>
                                <img className='controlImg' src="/images/delete.svg" alt="Delete" />
                                <span className='controlTitle'>Delete</span>
                            </button>
                        </li>
                    </>
                : null}
            </ul>
        </div>
        </>
    );}

export default Control;