import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import styles from './create_post.module.scss';

const URL = 'http://posts.com/posts/create';

const CreatePost = () => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await axios.post(URL, {
      content,
    });

    setContent('');
  };

  return (
    <div className={styles.create_post}>
      <h3 className={styles.title}>Create new post</h3>
      <form onSubmit={handleSubmit} className={styles.create_post_container}>
        <div className={styles.form_group}>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type='text'
            placeholder='Content'
            name='content'
            id='content'
          />
        </div>
        <div className={styles.form_group}>
          <button type='submit'>Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
