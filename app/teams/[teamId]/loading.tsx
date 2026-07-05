export default function Loading() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="h-8 w-28 rounded-full bg-white/10" />

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="h-28 w-28 rounded-3xl bg-white/10" />

              <div className="flex-1">
                <div className="h-4 w-32 rounded-full bg-white/10" />
                <div className="mt-4 h-10 w-72 rounded-xl bg-white/10" />
                <div className="mt-4 h-5 w-full max-w-md rounded-full bg-white/10" />

                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="h-9 w-28 rounded-full bg-white/10" />
                  <div className="h-9 w-40 rounded-full bg-white/10" />
                  <div className="h-9 w-24 rounded-full bg-white/10" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {Array.from({ length: 4 }).map((_, group) => (
              <div key={group}>
                <div className="mb-5 flex items-center justify-between">
                  <div className="h-7 w-40 rounded-full bg-white/10" />
                  <div className="h-7 w-10 rounded-full bg-white/10" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-24 rounded-3xl bg-white/[0.06]"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}