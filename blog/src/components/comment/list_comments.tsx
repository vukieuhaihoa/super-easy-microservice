import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './list_comments.module.scss';

const URL = 'http://localhost:3002/posts/';

const ListComments = ({ post_id }: { post_id: string }) => {
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const real_url = URL + post_id + '/comments';
      const res = await axios.get(real_url);
      setComments(res.data.data);
    };

    fetchData();
  }, []);

  const renderListComments = Object.values(comments).map(
    (comment: any, index) => {
      return <li key={index + 'comment'}>{comment.content}</li>;
    }
  );

  return (
    <div className={styles.root}>
      <i>{renderListComments.length} comments</i>
      <ul className={styles.list_comments}>{renderListComments}</ul>
    </div>
  );
};

export default ListComments;
