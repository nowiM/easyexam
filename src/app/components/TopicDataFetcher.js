import React, { use } from 'react';
import { fetchTopiceData } from '../utils/fetchTopiceData';
import TopicUpdateForm from './TopicUpdateForm';

const TopicDataFetcher = ({ id }) => {
    console.log("TopicDataFetcher page")
    const topiceData = use(fetchTopiceData(`${process.env.NEXT_PUBLIC_API_URL}api/topices/${id}`));
    console.log(topiceData);
    
    return (
        <TopicUpdateForm topiceData={topiceData} />
    );
}

export default TopicDataFetcher;

// 실패 유도 코드
// export default function TopicDataFetcher({ id }) {
//     console.log("TopicDataFetcher page");

//     // API 호출 실패 유도 (잘못된 URL 사용)
//     const initialData = use(fetchTopiceData(`${process.env.NEXT_PUBLIC_API_URL}api/nonexistent-route/${id}`));

//     return <TopicUpdateForm initialData={initialData} />;
// }
