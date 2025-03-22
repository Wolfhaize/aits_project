const IssueCard = ({ title, status }) => {
    return (
      <div className="issue-card">
        <h3>{title}</h3>
        <p>Status: {status}</p>
      </div>
    );
  };
  
  export default IssueCard;
  