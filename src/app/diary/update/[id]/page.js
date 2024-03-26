"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function UpdateDiaryPage() {
    const router = useRouter();
    const [diary, setDiary] = useState({});
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [firstRender, setFirstRender] = useState(true);
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
        if (content && title && firstRender) { //content와 title이 전부 값이 존재하는 상태일 때(두가지 값 전부 setting 완료되었을 떄) 실행
            document.querySelectorAll('.textarea-initial-auto-resize').forEach(function (textarea) {
                textarea.style.height = 'auto'; // 높이를 자동으로 조절하기 전에 초기화
                textarea.style.height = textarea.scrollHeight + 'px'; // 실제 스크롤 높이로 높이 설정
            });
            setFirstRender(false);
        }
    }, [content, title]);

    //수정완료 버튼 클릭시
    function updateInfo(e) {
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/diarys/${id}`, {
            method: 'PATCH', // PUT은 넘기지 않은 데이터는 NULL로 UPDATE (전체 수정), PATCH는 넘긴 데이터만 UPDATE (일부 수정)
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        }).then((res) => {
            if (res.ok) {
                return res.json(); //res.json()은 비동기 처리임. Promise 객체를 반환한다. 
            }
        }).then((data) => { //res.json()이 Promise이기때문에 한번 더 .then을 호출하여야 함
            if (data) {
                router.push(`/diary/read/${data.id}`);
                router.refresh();
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    //삭제하기 버튼 클릭시
    function deleteInfo(e) {
        if (confirm("정말 삭제하시겠습니까?")) {
            e.preventDefault();
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/diarys/${id}`, {
                method: 'DELETE', // PUT은 넘기지 않은 데이터는 NULL로 UPDATE (전체 수정), PATCH는 넘긴 데이터만 UPDATE (일부 수정)
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            }).then((res) => {
                if (res.ok) {
                    alert("삭제되었습니다.");
                    router.push(`/`);
                    router.refresh();
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            return false;
        }
    }

    return (

        <div className="vertical-align-lg">
            <textarea className="input-no-border input-same-as-h1 textarea-auto-resize textarea-initial-auto-resize" style={{ width: "100%" }} id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
            <div className="inline-elements spread-elements padB5 padT5 padL5 padR5" style={{ marginTop: "8px" }}>
                <h3 className="light-gray-text">{diary.registDate}</h3>
                <div className="inline-elements padB5 padT5 padR5">
                    <button onClick={updateInfo} className="btn btn-sm btn-outline-secondary marL10 marR10">
                        수정완료
                    </button>
                    <Link href={`/diary/read/${id}`} className="btn btn-sm btn-outline-secondary marL10">
                        취소
                    </Link>
                </div>
            </div>
            <hr />
            <textarea className="input-no-border textarea-auto-resize textarea-initial-auto-resize padT0 padB0 padL0 padR0 marT20" style={{ width: "100%", marginBottom: "36px" }} id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <hr />
            <div className="right-align padB5 padT5 padR5">
                <button onClick={deleteInfo} className="btn btn-sm btn-danger marL10 marR10">
                    삭제하기
                </button>
            </div>
        </div>
    )
}

