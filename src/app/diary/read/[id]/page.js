//import { useParams } from "next/navigation";
import Link from "next/link";

export default async function DiaryReadPage(props) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diarys/${props.params.id}`, { cache: "no-store" });
    const diary = await res.json();

    return (
        <div className="vertical-align-lg">
            <h1 style={{ whiteSpace: "pre-wrap"}}>{diary.title}</h1>
            <div className="inline-elements spread-elements padB5 padT5 padL5 padR5">
                <h3 className="light-gray-text">{diary.registDate}</h3>
                <div className="inline-elements padB5 padT5 padR5">
                    <Link href={`/diary/update/${diary.id}`} className="btn btn-sm btn-outline-secondary marL10 marR10">
                        수정
                    </Link>
                    <Link href="/" className="btn btn-sm btn-outline-secondary marL10">
                        목록
                    </Link>
                </div>
            </div>
            <hr />
            <div className="padL0 padR0 padT20 padB20" style={{ whiteSpace: "pre-wrap", minWidth: "100px", maxWidth: "800px" }}>
                <p className="word-wrap-text">{diary.content}</p>
            </div>
            <hr />
        </div>
    )
}

