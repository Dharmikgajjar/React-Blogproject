import { useState } from "react";

function AddBlog({ setPage }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (title === "") {
      setError("Please enter a post title");
      return;
    }

    if (author === "") {
      setError("Please enter an author name");
      return;
    }

    if (image === "") {
      setError("Please add a cover image");
      return;
    }

    if (category === "") {
      setError("Please select a category");
      return;
    }

    if (content === "") {
      setError("Please write some post content");
      return;
    }

    const oldBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const newBlog = {
      id: Date.now(),
      title: title,
      author: author,
      image: image,
      category: category,
      content: content,
    };

    const updatedBlogs = [...oldBlogs, newBlog];
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    alert("Post published!");
    setPage("list");
  }

  return (
    <div className="min-h-screen bg-paper py-16">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="font-display text-4xl text-[#201f1c] mb-10">
          Write a new post
        </h1>

        {error && (
          <div className="border-l-2 border-[#a8481f] pl-4 py-1 mb-8 text-[#a8481f] text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block text-sm font-medium text-[#57534a] mb-2">
              Post title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give it a title"
              className="w-full bg-transparent border-b border-[#d8d2c3] focus:border-[#4b5d3a] outline-none py-2.5 text-[#201f1c] placeholder:text-[#9c9587] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#57534a] mb-2">
              Author name
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className="w-full bg-transparent border-b border-[#d8d2c3] focus:border-[#4b5d3a] outline-none py-2.5 text-[#201f1c] placeholder:text-[#9c9587] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#57534a] mb-2">
              Cover image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-[#57534a] file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:bg-[#4b5d3a] file:text-[#f5f2ea] file:font-medium file:cursor-pointer hover:file:bg-[#3a4a2c] cursor-pointer"
            />
            {image && (
              <img
                src={image}
                alt="Cover preview"
                className="mt-4 w-full h-48 object-cover rounded-sm border border-[#d8d2c3]"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#57534a] mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent border-b border-[#d8d2c3] focus:border-[#4b5d3a] outline-none py-2.5 text-[#201f1c]"
            >
              <option value="">Select a category</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Recipes">Recipes</option>
              <option value="Health">Health</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#57534a] mb-2">
              Post content
            </label>
            <textarea
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post..."
              className="w-full border border-[#d8d2c3] focus:border-[#4b5d3a] outline-none rounded-sm px-4 py-3 text-[#201f1c] placeholder:text-[#9c9587] resize-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#4b5d3a] hover:bg-[#3a4a2c] text-[#f5f2ea] font-medium py-3.5 rounded-sm transition-colors"
          >
            Publish post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
