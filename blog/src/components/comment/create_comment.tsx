import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import styles from './create_comment.module.scss';

const URL = 'http://posts.com/posts/';

const CreateComment = ({ post_id }: { post_id: string }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const post_url = URL + post_id + '/comments';
    await axios.post(post_url, {
      content,
    });
    setContent('');
  };

  return (
    <div className={styles.comment_create}>
      <form className={styles.comment_create_container} onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <input
          placeholder='New comment'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name='comment'
          ></input>
        </div>
        <div className={styles.form_group}>
          <button type='submit'>Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
