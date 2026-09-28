const categoryColors = {
  Lifestyle: "#4b5d3a",
  Recipes: "#a8481f",
  Health: "#3a5b6b",
  Technology: "#8b6d3a",
};

function BlogDetails({ blogId, setPage }) {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  const blog = blogs.find((item) => item.id === blogId);

  if (!blog) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-4xl text-[#201f1c] mb-4">
          This post doesn't exist
        </h1>

        <button
          onClick={() => setPage("list")}
          className="text-[#4b5d3a] font-medium border-b border-[#4b5d3a] pb-0.5 hover:text-[#3a4a2c] hover:border-[#3a4a2c] transition-colors"
        >
          Back to all posts
        </button>
      </div>
    );
  }

  const accent = categoryColors[blog.category] || "#4b5d3a";

  return (
    <div className="min-h-screen bg-paper py-16">
      <div className="max-w-2xl mx-auto px-6">
        <article>
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-72 object-cover rounded-sm mb-8"
            />
          )}

          <p className="text-sm font-medium mb-4" style={{ color: accent }}>
            {blog.category}
          </p>

          <h1 className="font-display text-5xl leading-tight text-[#201f1c] mb-4">
            {blog.title}
          </h1>

          <p className="text-[#6b665c] mb-10">Written by {blog.author}</p>

          <div className="text-[#332f29] text-lg leading-8 whitespace-pre-line first-letter:font-display first-letter:text-6xl first-letter:font-medium first-letter:float-left first-letter:leading-[0.8] first-letter:mr-3 first-letter:mt-1">
            {blog.content}
          </div>

          <div className="flex gap-8 mt-14 pt-8 border-t border-[#d8d2c3] text-sm">
            <button
              onClick={() => setPage("edit")}
              className="text-[#4b5d3a] font-medium hover:text-[#3a4a2c] transition-colors"
            >
              Edit this post
            </button>

            <button
              onClick={() => setPage("list")}
              className="text-[#57534a] hover:text-[#201f1c] transition-colors"
            >
              Back to all posts
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogDetails;
