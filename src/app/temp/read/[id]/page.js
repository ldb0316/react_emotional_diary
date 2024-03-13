export default async function ReadPage(props) {

  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${props.params.id}`, {cache:'no-store'});
  const topic = await resp.json();

  return (
    <div>
      <h2>{topic.title}</h2>
      {topic.body}
    </div>
  );
}

