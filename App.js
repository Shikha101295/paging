import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Posts from './component/Posts';
import Pagination from './component/Pagination';
import React ,{useState,useEffect} from 'react';

const App=() =>{
  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(false);
  const [currentPage,setCurrentPage]=useState(1);
  const[postsPerPage]=useState(6);
  useEffect(()=>{
    const fetchPosts=async () =>{
      setLoading(true);
      const res=await axios.get('https://reqres.in/api/users?page=2');
      setPosts(res.data);
      setLoading(false);
    }
    fetchPosts();
  },[ ]);
  //get current posts
  const indexOfLastPost =currentPage*postsPerPage;
  const indexOfFirstPost =indexOfLastPost-postsPerPage;
  const currentPosts=posts.slice(indexOfFirstPost*indexOfLastPost);
  const paginate =pageNumber=>setCurrentPage(pageNumber);
  return (
    <div className="container mt-5">
     <h1 className="text-primmary mb-3">My Blog</h1>
     <Posts posts={currentPosts}loading ={loading}></Posts>
     <Pagination postsPerPage={postsPerPage} totalPosts={posts.length}paginate={paginate}/>
    </div>
  );
}

export default App;
