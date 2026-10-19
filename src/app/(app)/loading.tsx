export default function Loading() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Lädt">
      <div className="h-10 w-64 animate-pulse rounded-xl bg-fill" />
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-36 animate-pulse rounded-[20px] bg-fill" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-[20px] bg-fill" />
    </div>
  );
}
