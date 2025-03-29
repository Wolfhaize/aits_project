import React,{useState} from 'react';


const IssueCard = ({ id, title, description, status, onUpdateStatus, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  // Handle adding a new comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      onAddComment(id, newComment); // Notify parent component about the new comment
      setNewComment('');
    }
  };

  // Handle status change
  const handleStatusChange = (newStatus) => {
    onUpdateStatus(id, newStatus); // Notify parent component about the status change
  };

  return (
    <div className="issue-card">
      <h3>{title}</h3>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Status:</strong> {status}</p> */

      {/* Buttons to change issue status */}
      <div className="status-buttons">
        <button onClick={() => handleStatusChange('Resolved')}>Mark as Resolved</button>
        <button onClick={() => handleStatusChange('In Progress')}>Mark as In Progress</button>
        <button onClick={() => handleStatusChange('Pending')}>Mark as Pending</button>
      </div>*/

      {/* Comment section */}
      <div className="comment-section">
        <h4>Comments</h4>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        )}

        {/* Form to add new comment */}
        <form onSubmit={handleAddComment}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            rows="3"
          ></textarea>
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
};

export default IssueCard;

  