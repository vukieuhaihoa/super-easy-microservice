import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateComment from '../comment/create_comment';
import ListComments from '../comment/list_comments';
import styles from './list_posts.module.scss';

const URL_QUERY_SERVICE = 'http://posts.com/posts';

type Post = {
  id: string;
  content: string;
};

const ListPost = () => {
  const [posts, setPosts] = useState({});

  const fetchData = async () => {
    const res = await axios.get(URL_QUERY_SERVICE);
    // console.log(res);
    setPosts(res.data.data);
  };

  const renderPosts = Object.values(posts).map((post: any, index) => {
    return (
      <div key={index} className={styles.card}>
        <p>{post.content}</p>
        <ListComments comments={post.comments} />
        <CreateComment post_id={post.id} />
      </div>
    );
  });

  useEffect(() => {
    fetchData();
    // console.log('co vao day');
  }, []);

  return (
    <div className={styles.list_posts}>
      <h2>Posts</h2>
      <div className={styles.post_container}>{renderPosts}</div>
    </div>
  );
};

export default ListPost;
