
export default async function DiaryList() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diarys`);
    const data = await res.json();
    return (
        <div>
            {data.map((diary) => (
                <div key={diary.id}>{diary.title}</div>
            ))}
        </div>
    );
}

