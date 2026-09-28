import { useEffect, useState, useMemo, useCallback } from "react";
import BlogCard from "../components/BlogCard"; 
import smoothieImg from "../assets/smoothie.jpg"; 
import winterImg from "../assets/winter.jpg"; 

function Blogs({ setPage, goToBlog, goToEdit }) {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const recordsPerPage = 6;

  useEffect(() => {
    
    const savedData = localStorage.getItem("blogs");
    
    if (savedData && savedData !== "[]") {
      setBlogs(JSON.parse(savedData));
    } else {
      const defaultBlogs = [
        {
          id: 1,
          title: "Coffee Smoothie",
          author: "Dharmik",
          image: smoothieImg, 
          category: "Recipe",
          content: "Add all the ingredients to a high speed blender and blend until smooth. You might need more or less hazelnut milk depending on how thick you like your smoothie. Pour in a glass or bowl and add the shelled hemp seeds."
        },
        {
          id: 2,
          title: "High protein winter breakfast bowl",
          author: "Dharmik",
          image: winterImg, 
          category: "Recipe",
          content: "ingredients to make 1 bowl 200g high protein Greek yoghurt :20g protein 2 tbsp Chia seeds : 10g fibre / 5g protein 1 tbsp pumpkin seeds: 1g fibre / 1g protein 3 small prunes: 2g fibre 1/2 satsuma: 1g fibre 2 tbsp blueberries: 1g fibre Total protein= 26g ( bit low for me, so I often add 1/2 scoop of protein) Total fibre= 15g fibre (half the recommended daily intake) method The night before: In a medium bowl add the chia seeds and yoghurt and stir well. You can add a little milk to loosen it a bit. Store in the fridge overnight. In the morning, top with choice of fruit, nuts and seeds and vary each day if possible. Be creative and play with the flavours, fruits and texture!"
        }
      ];
      
      setBlogs(defaultBlogs);
      localStorage.setItem("blogs", JSON.stringify(defaultBlogs));
    }
  }, []);

  const deleteBlog = useCallback(
    (id) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );

      if (!confirmDelete) {
        return;
      }

      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(updatedBlogs);
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    },
    [blogs]
  );

  const filteredBlogs = useMemo(() => {
    let result = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === "author") {
      result.sort((a, b) => a.author.localeCompare(b.author));
    }
    if (sort === "category") {
      result.sort((a, b) => a.category.localeCompare(b.category));
    }

    return result;
  }, [blogs, search, sort]);

  const lastIndex = pageNumber * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentBlogs = filteredBlogs.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredBlogs.length / recordsPerPage);

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 pb-8 border-b border-[#d8d2c3]">
          <div>
            <h1 className="font-display text-5xl text-[#201f1c] mb-3">
              Welcome to blogg <span className="text-2xl font-normal text-gray-600">-by Dharmik</span>
            </h1>
            <p className="text-[#6b665c] max-w-md">
              {filteredBlogs.length} post{filteredBlogs.length !== 1 ? "s" : ""} so far
            </p>
          </div>
          <button
            onClick={() => setPage("add")}
            className="link-underline text-[#4b5d3a] font-medium pb-0.5 hover:text-[#3a4a2c] transition-colors self-start"
          >
            Write a post
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 mb-10">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageNumber(1);
            }}
            className="flex-1 bg-transparent border-b border-[#d8d2c3] focus:border-[#4b5d3a] outline-none py-2 text-[#201f1c] placeholder:text-[#9c9587] transition-colors"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent border-b border-[#d8d2c3] focus:border-[#4b5d3a] outline-none py-2 text-[#201f1c] sm:w-52"
          >
            <option value="">Sort by...</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="category">Category</option>
          </select>
        </div>

        {currentBlogs.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-[#d8d2c3] rounded-sm">
            <h2 className="font-display text-2xl text-[#201f1c] mb-2">
              Nothing here yet
            </h2>
            <p className="text-[#6b665c] mb-6">
              {search
                ? `No posts match "${search}".`
                : "Your first post is one click away."}
            </p>
            <button
              onClick={() => setPage("add")}
              className="link-underline text-[#4b5d3a] font-medium pb-0.5 hover:text-[#3a4a2c] transition-colors"
            >
              Start writing
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {currentBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                deleteBlog={deleteBlog}
                goToBlog={goToBlog}
                goToEdit={goToEdit}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-6 mt-16 pt-8 border-t border-[#d8d2c3]">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setPageNumber(index + 1)}
                className={`text-sm pb-1 transition-colors ${
                  pageNumber === index + 1
                    ? "text-[#201f1c] font-semibold border-b-2 border-[#4b5d3a]"
                    : "text-[#9c9587] hover:text-[#57534a]"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;