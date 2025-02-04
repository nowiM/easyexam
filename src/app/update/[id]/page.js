// update/[id]/page.js
'use client'
import React, { Suspense } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import UpdateTopiceDataFetcher from '../../components/UpdatePage/UpdateTopiceDataFetcher';

const UpdatePage = ({ params: { id } }) => {
    return (
        <div className='updateCotainer'>
            <div className="updateForm">
                <ErrorBoundary fallback={<h2>⚠️ 오류가 발생했습니다. 다시 시도해주세요.</h2>}>
                    <Suspense fallback={<h2>Loading...</h2>}>
                        <UpdateTopiceDataFetcher id={id} />
                    </Suspense>
                </ErrorBoundary>
            </div>
        </div>
    );
}

export default UpdatePage;
