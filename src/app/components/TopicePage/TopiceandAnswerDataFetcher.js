'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import fetchTopiceData from '../../utils/shared/fetchTopiceData'
import fetchAnswersData from '../../utils/TopicPage/fetchAnswersData'
import Form from './AnswersForm'

const TopiceandAnswerDataFetcher = ({ id }) => {
    const {data: topiceData} = useSuspenseQuery({
        queryKey: ['topiceData'],
        queryFn: () => fetchTopiceData(`${process.env.NEXT_PUBLIC_API_URL}api/topices/${id}`)
    });
    
    const {data: answerData} = useSuspenseQuery({
        queryKey: ['answerData', id],
        queryFn: () => fetchAnswersData(id, `${process.env.NEXT_PUBLIC_API_URL}api/answers`)
    });

    return <Form topiceData={topiceData} answerData={answerData} />
}

export default TopiceandAnswerDataFetcher;