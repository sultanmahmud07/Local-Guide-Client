
export default async function ExploreTours({searchParams}: {searchParams: {type?: string}}) {
  const {type} = await searchParams;
  console.log(type)
  return (
    <div>
    <h3>Explore tours</h3>
    </div>
  );
}
