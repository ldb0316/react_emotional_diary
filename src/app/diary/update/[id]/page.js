"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function UpdateDiaryPage() {
    const router = useRouter();
    const [diary, setDiary] = useState({});
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const params = useParams();
    const id = params.id;
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/diarys/${id}`)
            .then(res => res.json())
            .then(result => {
                setDiary(result);
                setContent(result.content);
                setTitle(result.title);
                document.querySelector("#title").focus();//제목으로 auto focus하여 수정 가능하다는것을 직관적으로 표시
                document.addEventListener('input', function (event) {
                    if (event.target.classList.contains('textarea-auto-resize')) {
                        event.target.style.height = 'auto'; // 높이를 자동으로 조절하기 전에 초기화
                        event.target.style.height = event.target.scrollHeight + 'px'; // 실제 스크롤 높이로 높이 설정
                    }
                }, false);
            });
    }, [id]);

    //setState는 비동기 처리이기 때문에 content와 title이 변경된 이후에 해당 script를 실행하도록 강제 동기처리
    useEffect(() => {
        if (content && title) { //content와 title이 전부 값이 존재하는 상태일 때(두가지 값 전부 setting 완료되었을 떄) 실행
            document.querySelectorAll('.textarea-initial-auto-resize').forEach(function (textarea) {
                textarea.style.height = 'auto'; // 높이를 자동으로 조절하기 전에 초기화
                textarea.style.height = textarea.scrollHeight + 'px'; // 실제 스크롤 높이로 높이 설정
            });
        }
    }, [content, title]);

    return (
        // <div>
        //     <h1>수정하기</h1>
        //     <form>
        //         <div>
        //             <label htmlFor="title">제목</label>
        //             <input type="text" id="title" name="title" value={diary.title} />
        //         </div>
        //     </form>
        // </div>
        <div className="vertical-align-lg">
            <textarea className="input-no-border input-same-as-h1 textarea-auto-resize textarea-initial-auto-resize" style={{ width: "100%" }} id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
            <div className="inline-elements spread-elements padB5 padT5 padL5 padR5" style={{ width: "100%" }}>
                <h3 className="light-gray-text">{diary.registDate}</h3>
                <div className="inline-elements padB5 padT5 padR5">
                    <Link href={`/diary/update/${id}`} className="btn btn-sm btn-primary marL10 marR10">
                        수정완료
                    </Link>
                    <Link href={`/diary/read/${id}`} className="btn btn-sm btn-dark marL10">
                        취소
                    </Link>
                </div>
            </div>
            <hr />
            <textarea className="input-no-border textarea-auto-resize textarea-initial-auto-resize marT20 marB20" style={{ width: "100%" }} id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <hr />
        </div>
    )
}

