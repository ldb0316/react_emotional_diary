import Link from 'next/link';

export default async function DiaryList() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diarys`, {cache:'no-store'});
    const data = await res.json();

    return (
        <div className="horizontal-align-lg">
            {data.map((diary) => (
                <div className="card" key={diary.id}>
                    <img src="/jjo.png" alt="jjo" />
                    <div className="card-body">
                        <div className='inline-elements spread-elements padL0 padR0 padT0 padB0'>
                            <h5 className="card-title text-truncate">{diary.title}</h5>
                            <h5 className="light-gray-text">{diary.registDate}</h5>
                        </div>
                        <p className="card-text text-truncate">{diary.content}</p>
                    </div>
                    <Link href={`/diary/read/${diary.id}`} className='btn btn-primary'>
                        Read More
                    </Link>
                </div>
            ))}
        </div>
    );
}

