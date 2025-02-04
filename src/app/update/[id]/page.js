// update/[id]/page.js
'use client'
import React, { Suspense } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import TopicDataFetcher from '../../components/TopicDataFetcher';

const UpdatePage = ({ params: { id } }) => {
    return (
        <div className='updateCotainer'>
            <div className="updateForm">
                <ErrorBoundary fallback={<h2>⚠️ 오류가 발생했습니다. 다시 시도해주세요.</h2>}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <TopicDataFetcher id={id} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    );
}

export default UpdatePage;
