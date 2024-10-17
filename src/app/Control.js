'use client';
import Link from 'next/link';
import { useParams,useRouter } from 'next/navigation';

const Control = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    return (
        <ul>
            <li><Link href="/create">Create</Link></li>
            {id ? 
                <>
                    <li><input type="button" value='delete' onClick={() => {
                        const options = {method: 'DELETE'};

                        fetch(`${process.env.NEXT_PUBLIC_API_URL}api/topices/${id}`, options)
                            .then(response => response.json())
                            .then(result => {
                                router.push('/')
                                router.refresh();
                            })
                    }}/></li>
                </>
            : null}
        </ul>
    );
}

export default Control;