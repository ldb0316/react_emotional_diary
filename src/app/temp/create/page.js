"use client";
import { useRouter } from 'next/navigation';

export default function Create() {

  const router = useRouter();

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;
      fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`, {
        method: 'POST',
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
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea type="text" name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}

