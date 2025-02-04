'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import topicPagefetchData from '@/app/utils/TopicPage/topicPagefetchData'
import answerFetchData from '../../utils/TopicPage/answerFetchData'
import Form from '../TopicePage/Form'

const DataFetcher = ({ id }) => {
    const {data: topiceData} = useSuspenseQuery({
        queryKey: ['topiceData'],
        queryFn: () => topicPagefetchData(`${process.env.NEXT_PUBLIC_API_URL}api/topices/${id}`)
    });
    
    const {data: answerData} = useSuspenseQuery({
        queryKey: ['answerData', id],
        queryFn: () => answerFetchData(id, `${process.env.NEXT_PUBLIC_API_URL}api/answers`)
    });
    console.log(topiceData, answerData);
    return <Form topiceData={topiceData} answerData={answerData} />
}

export default DataFetcher;