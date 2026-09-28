import { useState } from "react";

import Navbar from "./components/Navbar";
import Blogs from "./components/Blogs";
import AddBlog from "./components/AddBlog";
import BlogDetails from "./components/BlogDetails";
import EditBlog from "./components/EditBlog";

function App() {
 
  const [page, setPage] = useState("list");
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  function goToBlog(id) {
    setSelectedBlogId(id);
    setPage("view");
  }

  function goToEdit(id) {
    setSelectedBlogId(id);
    setPage("edit");
  }

  return (
    <>
      <Navbar setPage={setPage} />
      {page === "list" && (
        <Blogs
          setPage={setPage}
          goToBlog={goToBlog}
          goToEdit={goToEdit}
        />
      )}

      {page === "add" && <AddBlog setPage={setPage} />}

      {page === "view" && (
        <BlogDetails
          blogId={selectedBlogId}
          setPage={setPage}
        />
      )}

      {page === "edit" && (
        <EditBlog
          blogId={selectedBlogId}
          setPage={setPage}
        />
      )}
    </>
  );
}

export default App;