import { useState } from "react";

function EditBlog({ blogId, setPage }) {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const blog = blogs.find((item) => item.id === blogId);
  const [title, setTitle] = useState(blog?.title || "");
  const [author, setAuthor] = useState(blog?.author || "");
  const [image, setImage] = useState(blog?.image || "");
  const [content, setContent] = useState(blog?.content || "");

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

  function updateBlog(e) {
    e.preventDefault();

    if (
      title === "" ||
      author === "" ||
      image === "" ||
      content === ""
    ) {
      alert("Please fill all fields");

      return;
    }

    const updatedBlogs = blogs.map((item) => {
      if (item.id === blogId) {
        return {
          ...item,
          title: title,
          author: author,
          image: image,
          content: content,
        };
      }

      return item;
    });

    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    alert("Post updated!");
    setPage("list");
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-display text-4xl text-[#201f1c]">
          This post doesn't exist
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper py-16">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="font-display text-4xl text-[#201f1c] mb-10">
          Edit post
        </h1>

        <form onSubmit={updateBlog} className="space-y-7">
          <div>
            <label className="block text-sm font-medium text-[#57534a] mb-2">
              Post title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-b border-[#d8d2c3] focus:border-[#4b5d3a] outline-none py-2.5 text-[#201f1c] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#57534a] mb-2">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-transparent border-b border-[#d8d2c3] focus:border-[#4b5d3a] outline-none py-2.5 text-[#201f1c] transition-colors"
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
              Post content
            </label>
            <textarea
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-[#d8d2c3] focus:border-[#4b5d3a] outline-none rounded-sm px-4 py-3 text-[#201f1c] resize-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="bg-[#4b5d3a] hover:bg-[#3a4a2c] text-[#f5f2ea] font-medium px-6 py-3 rounded-sm transition-colors"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;