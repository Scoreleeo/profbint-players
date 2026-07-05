export default function Loading() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="h-32 w-32 rounded-full bg-white/10" />

              <div className="flex-1">
                <div className="h-4 w-36 rounded-full bg-white/10" />
                <div className="mt-4 h-12 w-72 rounded-xl bg-white/10" />

                <div className="mt-6 flex flex-wrap gap-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-9 w-24 rounded-full bg-white/10"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-32 rounded-3xl bg-white/[0.06]"
              />
            ))}
          </div>

          <div className="rounded-3xl bg-white/[0.04] p-8">
            <div className="h-6 w-56 rounded-full bg-white/10" />
            <div className="mt-6 space-y-3">
              <div className="h-4 rounded-full bg-white/10" />
              <div className="h-4 rounded-full bg-white/10" />
              <div className="h-4 w-5/6 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}