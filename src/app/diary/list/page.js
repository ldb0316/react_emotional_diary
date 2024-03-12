
export default async function DiaryList() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diarys`, {cache:'no-store'});
    const data = await res.json();
    return (
        <div className="horizontal-align-lg">
            {data.map((diary) => (
                <div className="card" key={diary.id}>
                    <img src="/test.png" alt="test" />
                    <div className="card-body">
                        <h5 className="card-title">{diary.title}</h5>
                        <p className="card-text">{diary.content}</p>
                    </div>
                    <button className="btn btn-primary">Read More</button>
                </div>
            ))}
        </div>
    );
}

