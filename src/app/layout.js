// app/layout/js
import Link from 'next/link'
import Control from './components/Control';

import "./globals.css";

const RootLayout = ({ children }) => {
  return (
    <html>
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta name="description" content="EasyExam - 실시간 시험 답안 복원 및 의견 공유 플랫폼" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="EasyExam, 시험 복원, 실시간 답안, 의견 공유, 자격증 시험, 시험 준비" />
        <meta property="og:title" content="EasyExam - 실시간 시험 답안 복원 및 의견 공유 플랫폼" />
        <meta property="og:description" content="자격증 시험 답안을 빠르게 복원하고, 실시간으로 의견을 나눌 수 있는 플랫폼입니다." /> 
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content="https:easyexam.me" />
        <title>EasyExam - 실시간 시험 답안 복원 및 의견 공유</title>
      </head>
      <body>
        <div className="container">
          <div className="mainPageCotainer">
            <Link href='/' className='mainPage behind'>Easy<span className='emphasis'>:</span>Exam</Link>
          </div>
          
          <Control />

          {children}

          <div className="footer">
            <span className='footer-item'>© 2024 Easy:Exam All right reserved</span>
            <span className='footer-item'>✉️ contact : iimerty35@gmail.com</span>
            <span className='footer-item'>© Icons by Icons8</span>
          </div>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;