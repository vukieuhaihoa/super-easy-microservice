import React from 'react';
import styles from './list_comments.module.scss';

const ListComments = ({ comments }: { comments: Object }) => {
  const renderListComments = Object.values(comments).map(
    (comment: any, index) => {
      let content = comment.content;
      if (comment.status === 'rejected') {
        content = 'This comment rejected';
      }

      if (comment.status === 'pending') {
        content = 'This comment is waiting to moderation';
      }

      return <li key={index + 'comment'}>{content}</li>;
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
