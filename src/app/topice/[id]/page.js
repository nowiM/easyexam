// app/topice/[id]/page.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../../components/Modal';
import CommentSection from '../../components/CommentSection';
import topicPagefetchData from '../../utils/TopicPage/topicPagefetchData'
import calc from '../../utils/TopicPage/calc'
import closeModal from '../../utils/TopicPage/closeModal'
import scoreCalc from '../../utils/TopicPage/scoreCalc'
import handleInputChange from '../../utils/TopicPage/handleInputChange'
import handleSubmit from '../../utils/TopicPage/handleSubmit'
import React, { Suspense } from 'react';
import ErrorBoundary from '@/app/components/ErrorBoundary';
import DataFetcher from '@/app/components/TopicePage/DataFetcher';

const TopicePage = ({ params }) => {
    const id = Number(params.id);
    
    return (
        <div className="topiceAndComment">
            <ErrorBoundary fallback={<div>Error!!!</div>}>
                <Suspense fallback={<div>Loading...</div>}>
                    <DataFetcher id={id} />
                </Suspense>
            </ErrorBoundary>
        </div>
    )
};

export default TopicePage;
