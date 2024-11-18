// app/layout/js
import Link from 'next/link'
import Control from './components/Control';
import connectDB from './db/connect';
import "./globals.css";

const RootLayout = ({ children }) => {
  connectDB() // 데이터베이스 연결
  
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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