import Link from 'next/link';
import { useSuspenseQuery } from '@tanstack/react-query';
import topiceListFetchdata from '../utils/TopiceListFetchdata';

const TopiceList = () => {
    const {data: topices} = useSuspenseQuery({
        queryKey: ['topices'],
        queryFn: () => topiceListFetchdata(`${process.env.NEXT_PUBLIC_API_URL}api/topices`, { cache: 'no-store' })
    })
    return (
        <>
            {
                topices.map(topice => (
                    <li key={topice.id} className='topice'>
                        <Link className='topicLink' href={`/topice/${topice.id}`}>
                            <div className="imgAndTitle">
                                <img className='folder' src="/images/folder.svg" alt="folderImg" />
                                <span className='topiceTitle'>{topice.title}</span>
                            </div>
                        </Link>
                    </li>
                ))
            }
        </>
    )
}

export default TopiceList;