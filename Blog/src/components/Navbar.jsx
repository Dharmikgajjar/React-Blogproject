function Navbar({ setPage }) {
  return (
    <nav className="bg-paper border-b border-[#d8d2c3] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-baseline justify-between">
        <button
          onClick={() => setPage("list")}
          className="font-display text-3xl text-[#201f1c]"
        >
          Blogg
        </button>

        <div className="flex items-center gap-8">
          <button
            onClick={() => setPage("list")}
            className="link-underline text-[15px] text-[#57534a] hover:text-[#201f1c] transition-colors"
          >
            All posts
          </button>

          <button
            onClick={() => setPage("add")}
            className="link-underline text-[15px] font-medium text-[#4b5d3a] hover:text-[#3a4a2c] transition-colors"
          >
            Write a post
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
