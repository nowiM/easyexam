// app/page.js
import Link from  'next/link';

const Home = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/topices`, { cache: 'no-store' });
  const topices = await response.json();
  return (
    <>
    <div className="topiceContainer">
      <ul className='topiceList'>
          {
            topices.map(topice => (
              <li key={topice.id} className='topice'>
                  <Link className='topicLink' href={`/test/${topice.id}`}>
                    <div className="imgAndTitle">
                        <img className='folder' src="/images/folder.svg" alt="folderImg" />
                        <span className='topiceTitle'>{topice.title}</span>
                    </div>
                  </Link>
              </li>
            ))
          }
        </ul>
    </div>
    </>
  );
}

export default Home;
