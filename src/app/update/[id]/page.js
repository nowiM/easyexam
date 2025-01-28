// update/[id]/page.js
import { Suspense } from 'react';
import SubComponentsWrapper from '../../components/SubComponentsWrapper';

export default async function UpdatePage({ params }) {
    console.log("UpDate page");
    const paramsId = params.id;

    return (
        <div className='updateCotainer'>
            <div className="updateForm">
                <Suspense fallback={<div>Loading...</div>}>
                    <SubComponentsWrapper id={paramsId} />
                </Suspense>
            </div>
        </div>
    );
}
