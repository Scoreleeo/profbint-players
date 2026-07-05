export default function Loading() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="h-8 w-52 rounded-full bg-white/10" />
            <div className="mt-8 h-12 max-w-2xl rounded-2xl bg-white/10 sm:h-16" />
            <div className="mt-5 h-5 max-w-xl rounded-full bg-white/10" />
            <div className="mt-3 h-5 max-w-lg rounded-full bg-white/10" />

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="h-28 rounded-3xl bg-white/10" />
              <div className="h-28 rounded-3xl bg-white/10" />
              <div className="h-28 rounded-3xl bg-white/10" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-48 rounded-3xl bg-white/[0.06]" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}