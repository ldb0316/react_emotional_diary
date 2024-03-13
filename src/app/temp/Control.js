"use client";
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function Control() {
    const params = useParams();
    const id = params.id;
    const router = useRouter();
    return (
        <ul>
            <li><Link href="/create">Create</Link></li>
            {
                id ?
                    <>

                        <li><Link href={"/update/"+id}>Update</Link></li>
                        <li><input type="button" value="delete" onClick={() => {
                            fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`, {
                                method: 'DELETE'
                            }).then((res) => {
                                if (res.ok) {
                                    alert('삭제되었습니다.');
                                    router.push('/');
                                    router.refresh();
                                }
                            });
                        }}/></li>
                        <li><Link href="/">홈으로</Link></li>
                    </>
                    :
                    <></>
            }

        </ul>
    )
}