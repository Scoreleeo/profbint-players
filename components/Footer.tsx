export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-8 text-center text-sm text-slate-500">
      <p>Pro Football Intel Player Database</p>

      <div className="mt-3 flex justify-center gap-4">
        <a href="https://profbint.com" className="hover:text-yellow-400">
          Predictions
        </a>
        <a href="https://results.profbint.com" className="hover:text-yellow-400">
          Results
        </a>
      </div>
    </footer>
  );
}