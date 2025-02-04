// app/topice/[id]/page.js
'use client';
import React, { Suspense } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import TopiceandAnswerDataFetcher from '../../components/TopicePage/TopiceandAnswerDataFetcher';

const TopicePage = ({ params }) => {
    const id = Number(params.id);
    
    return (
        <div className="topiceAndComment">
            <ErrorBoundary fallback={<div>Error!!!</div>}>
                <Suspense fallback={<div>Loading...</div>}>
                    <TopiceandAnswerDataFetcher id={id} />
                </Suspense>
            </ErrorBoundary>
        </div>
    )
};

export default TopicePage;
