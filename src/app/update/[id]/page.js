'use client';
import React, { Suspense } from 'react';

const UpdatePage = ({ params }) => {
    const paramsId = params.id;
    const SubComponents = React.lazy(() => import('../../components/SubCompoent'));

    return (
        <div className='updateCotainer'>
            <div className="updateForm">                
                <Suspense fallback={<div>Loading...</div>}>
                    <SubComponents id={paramsId}/>
                </Suspense>
            </div>
        </div>
    );
};

export default UpdatePage;
