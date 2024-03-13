"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Update() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`)
            .then(resp => resp.json())
            .then(result => {
                setTitle(result.title);
                setBody(result.body);
            });
    }, [id]);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.title.value;
            const body = e.target.body.value;
            fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            }).then((resp) => resp.json()).then((data) => {
                console.log(data);
                const lastid = data.id;
                router.push(`/read/${lastid}`);
                router.refresh();
            });
        }}>
            <p>
                <input type="text" name="title" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </p>
            <p>
                <textarea type="text" name="body" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            </p>
            <p>
                <input type="submit" value="update" />
            </p>
        </form>
    );
}

