/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState , useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedPosts, setPaginatedPosts] = useState([])

  let pageSize = 10
  let pageNumbers

  useEffect(() => {

    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        let endIndex = pageSize * currentPage;
        let startIndex = endIndex - pageSize
        let showCurrentPosts = data.slice(startIndex, endIndex)
        setPaginatedPosts(showCurrentPosts)
      })
  }, [])

  useEffect(() => {
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    let showCurrentPosts = posts.slice(startIndex, endIndex);
    setPaginatedPosts(showCurrentPosts);
  }, [currentPage, pageSize, posts])

  const changePaginated = (newPage) => {
    setCurrentPage(newPage)
  }

  const pageCount = Math.ceil(posts.length / pageSize)
  pageNumbers = Array.from(Array(pageCount).keys())


  return (
    <div className="App container mt-5">
      {
        !posts ? "IsLoading" : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>UserID</th>
                <th>Title</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {
                paginatedPosts.map(post => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.userId}</td>
                    <td className='text-start'>{post.title}</td>
                    <td>
                      <p className=
                        {post.completed ? "btn btn-outline-success" : "btn btn-outline-danger"}
                      >
                        {post.completed ? "True" : "False"}
                      </p>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
      <nav className='d-flex justify-content-center container'>
        <ul className="pagination">
          {pageNumbers.map((page, index) => (
            <li
              style={{ cursor: "pointer" }}
              key={index} className=
              {page + 1 === currentPage ? "page-item active" : "page-item"}
              onClick={() => changePaginated(page + 1)}
            >
              <span className="page-link">{page + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default App;
