import React, { use } from 'react';
import { fetchTopiceData } from '../utils/fetchTopiceData';
import SubComponents from './SubComponents';

export default function SubComponentsWrapper({ id }) {
    console.log("SubComponentsWrapper page")
    // `Suspense`와 `use`를 유지
    const initialData = use(fetchTopiceData(`${process.env.NEXT_PUBLIC_API_URL}api/topices/${id}`));

    return (
        <SubComponents initialData={initialData} />
    );
}