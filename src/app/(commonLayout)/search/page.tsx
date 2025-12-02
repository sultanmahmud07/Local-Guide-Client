
export default async function Search({searchParams}: {searchParams: {type?: string}}) {
  const {type} = await searchParams;
  console.log(type)
  return (
    <div>
    <h3>Search</h3>
    </div>
  );
}
