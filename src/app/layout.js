// app/layout/js
import Link from 'next/link'
import Control from './Control';
import "./globals.css";

const RootLayout = ({ children }) => {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="container">
          <div className="mainPageCotainer">
            <Link href='/' className='mainPage behind'>Easy:Exam</Link>
          </div>
          
          <Control />

          {children}

          <div className="footer">
            © 2024 Easy:Exam All right reserved contact : iimerty35@gmail.com © Icons by Icons8
          </div>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;