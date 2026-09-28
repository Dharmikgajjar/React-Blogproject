> Overview

This is a simple blog website made using React and Tailwind CSS. The website allows users to create, view, edit, delete, search, and sort blog posts.

> App.jsx

This is the main component of the project. It controls which page is currently displayed and handles navigation between the blog list, add post, blog details, and edit pages.

> Navbar.jsx

This component contains the navigation bar of the website. It has buttons for viewing all posts and creating a new post.

> Blogs.jsx

This component displays all the blog posts in a grid layout. It also handles searching, sorting, pagination, deleting posts, and loading default blog data from localStorage.

> BlogCard.jsx

This component is used to display each individual blog post as a card. It shows the blog image, title, category, author, short content, and buttons for reading, editing, and deleting the post.

AddBlog.jsx

This component is used to create a new blog post. The user can enter the title, author, category, content, and upload a cover image. The new post is then saved in localStorage.

> BlogDetails.jsx

This component shows the complete details of a selected blog post. It displays the cover image, category, title, author, and full blog content.

> EditBlog.jsx

This component is used to edit an existing blog post. The user can update the title, author, cover image, and content, and the changes are saved back to localStorage.

> localStorage

I used localStorage to store the blog posts so that the data does not disappear when the page is refreshed. It is also used when adding, editing, and deleting posts.

Recording> 
https://drive.google.com/file/d/1Mv6G5ZcxhnlJ95gmR5CJjqgI2SzK4Pq6/view?usp=sharing

Sort blogs by title, author, or category

Pagination for blog posts

Store data using localStorage

Responsive layout using Tailwind CSS
