export default function Loading() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="h-8 w-32 rounded-full bg-white/10" />
            <div className="mt-8 flex items-center gap-5">
              <div className="h-24 w-24 rounded-3xl bg-white/10" />
              <div className="flex-1">
                <div className="h-4 w-28 rounded-full bg-white/10" />
                <div className="mt-4 h-10 w-72 rounded-xl bg-white/10" />
                <div className="mt-4 h-5 w-full max-w-md rounded-full bg-white/10" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="h-56 rounded-3xl bg-white/[0.06]"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}