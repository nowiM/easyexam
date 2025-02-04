// app/page.js
'use client'

import React, { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import TopiceList from './components/TopiceList';

const Home = () => {
  return (
    <div className="topiceContainer">
      <ul className='topiceList'>
      <ErrorBoundary fallback={<h2 style={{margin: "auto"}}>⚠️ 오류가 발생했습니다. 다시 시도해주세요.</h2>}>
        <Suspense fallback={<h2 style={{margin: "auto"}}>Loading...</h2>}>
          <TopiceList />
        </Suspense>
      </ErrorBoundary>
      </ul>
    </div>
  );
}

export default Home;
