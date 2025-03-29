import IssueCard from "../../../components/IssueCard";
import DashboardLayout from "../../../layouts/DashboardLayout";
import React, { useState, useEffect } from 'react';

function LecturerIssues() {
  /* sample data for issues, comes from API */
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true); /* for showing a loading spinner */
  const [error, setError] = useState(null); /* to handle errors during fetch */
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); /*Sort order by submission date*/


  /* fetch issues data from API */
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        /* replace with actual API URL */
        const response = await fetch('/api/issues');

        if (!response.ok) {
          throw new Error('Failed to fetch issues');
        }
        const data = await response.json();
        setIssues(data); /* set issues data in state */
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);   /* once done, stop loading spinner */
      }
    };

    fetchIssues(); /* call the function to fetch issues */

  }, []); /* empty array ensures this only runs once when the component mounts */

  /* handle status update of an issue (mark as resolved, in progress, pending, unresolved) */
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      /* send PUT request to update the issue status in the backend */
      const response = await fetch(`/api/issues/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update issue status');
      }

      /* update the status locally once the update is successful */
      setIssues(issues.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      ));
    } catch (err) {
      console.error(err);
    }
  };

  /* handling adding a comment to an issue */
  const handleAddComment = async (id, newComment) => {
    try {
      // Send POST request to add a comment to the issue
      const response = await fetch(`/api/issues/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: newComment })
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      // Fetch the updated issue list after adding the comment
      const updatedIssue = await response.json();
      setIssues(issues.map((issue) =>
        issue.id === id ? { ...issue, comments: updatedIssue.comments } : issue
      ));
    } catch (err) {
      console.error(err);
    }
  };


  // Search and filter logic
  const filteredIssues = issues.filter(issue => {
    return (
      (issue.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       issue.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter ? issue.status === statusFilter : true)
    );
  });

  /*Sorting logic*/
  const sortedIssues = filteredIssues.sort((a, b) => {
    const dateA = new Date(a.submissionDate);
    const dateB = new Date(b.submissionDate);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });




  /*Show loading spinner while fetching data*/
  if (loading) {
    return <div>Loading issues...</div>;
  }

  // Handle errors while fetching
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Main JSX to render the issues list
  return (
    <DashboardLayout>
      <div className='lecturer-issues'>
        <h1>Lecturer Issues</h1>
        <p>View and manage academic issues.</p>


         {/* Search and Filter Section */}
         <div className="search-filter">
          <input
            type="text"
            placeholder="Search by title or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        <div className='issues-list'>
          {/* display all issues */}
          {sortedIssues.length === 0 ? (
            <p>No issues available at the moment</p>
          ) : (
            sortedIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onUpdateStatus={handleUpdateStatus}
                onAddComment={handleAddComment}
              />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LecturerIssues;
