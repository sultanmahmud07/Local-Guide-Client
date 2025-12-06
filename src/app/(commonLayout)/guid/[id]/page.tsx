

export default async function GuidDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div>
    <h3>Guide details page</h3>
    </div>
  );
}
