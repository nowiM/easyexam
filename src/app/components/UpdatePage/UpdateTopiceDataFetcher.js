'use client'
import { useSuspenseQuery } from '@tanstack/react-query';
import fetchTopiceData from '../../utils/shared/fetchTopiceData';
import UpdateForm from './UpdateForm';

const UpdateTopiceDataFetcher = ({ id }) => {
    const { data: topiceData } = useSuspenseQuery({
        queryKey: ['topiceData', id],
        queryFn: () => fetchTopiceData(`${process.env.NEXT_PUBLIC_API_URL}api/topices/${id}`),
    });

    return <UpdateForm topiceData={topiceData} />;
};

export default UpdateTopiceDataFetcher;
