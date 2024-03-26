import Link from 'next/link';

export default async function DiaryList() {
    //json-server에서 order by 지정하기 
    //GET요청과 함께 _sort=칼럼명 
    // 구 방식 : _sort=칼럼명&_order=desc 
    // 현재 방식(오름차순) : _sort=칼럼명
    // 현재 방식(내림차순) : _sort=-칼럼명         
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diarys?_sort=-registDateTime`, { cache: 'no-store' });
    const data = await res.json();
    const now = new Date().toLocaleDateString();
    var showWriteButton = true;
    /** 아래 코드 주석 해제하면 하루에 하나만 다이어리 등록 가능 */
    // data.map((diary) => {
    //     // diary.registDate = diary.registDate.replace(/-/g, '. ');
    //     if (diary.registDate == now) {
    //         showWriteButton = false;
    //     }
    // })

    return (
        <>
            {showWriteButton ?
                <div className="horizontal-align-lg">
                    <Link className="btn btn-outline-secondary f24" href={'/diary/create'}>{now} Write Today's Diary (❁´◡`❁)</Link>
                </div>
                :
                <></>
            }

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
                        <Link href={`/diary/read/${diary.id}`} className='btn btn-outline-secondary'>
                            Read More
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

