const categoryColors = {
  Lifestyle: "#4b5d3a",
  Recipes: "#a8481f",
  Health: "#3a5b6b",
  Technology: "#8b6d3a",
};

function BlogCard({ blog, deleteBlog, goToBlog, goToEdit }) {
  const accent = categoryColors[blog.category] || "#4b5d3a";

  return (
    <div className="group card-hover">
      {blog.image && (
        <button onClick={() => goToBlog(blog.id)} className="block w-full">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-40 object-cover rounded-sm mb-4"
          />
        </button>
      )}
      <div className="pt-5 border-t-2" style={{ borderColor: accent }}>
        <p className="text-sm font-medium mb-2" style={{ color: accent }}>
          {blog.category}
        </p>
        <h2 className="font-display text-2xl leading-snug text-[#201f1c] mb-2">
          <button
            onClick={() => goToBlog(blog.id)}
            className="text-left hover:underline underline-offset-4 decoration-1"
          >
            {blog.title}
          </button>
        </h2>
        <p className="text-sm text-[#9c9587] mb-3">By {blog.author}</p>
        <p className="text-[#57534a] leading-relaxed mb-4">
          {blog.content.substring(0, 100)}...
        </p>

        <div className="flex items-center gap-5 text-sm">
          <button
            onClick={() => goToBlog(blog.id)}
            className="text-[#201f1c] font-medium hover:text-[#4b5d3a] transition-colors"
          >
            Read
          </button>

          <button
            onClick={() => goToEdit(blog.id)}
            className="text-[#57534a] hover:text-[#201f1c] transition-colors"
          >
            Edit
          </button>

          <button
            onClick={() => deleteBlog(blog.id)}
            className="text-[#9c9587] hover:text-[#a8481f] transition-colors ml-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
