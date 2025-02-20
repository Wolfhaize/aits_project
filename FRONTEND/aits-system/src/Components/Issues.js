import React, { useState, useEffect } from 'react';
import { IssueService } from '../api/services';

const IssueTracker = () => {
    const [issues, setIssues] = useState([]); // Stores the list of issues
    const [loading, setLoading] = useState(true); // Tracks if data is loading
    const [error, setError] = useState(null); // Stores any error messages
    const [newIssue, setNewIssue] = useState({
        title: '',
        description: '',
        priority: 'low',
        status: 'pending',
        student_id: '',
        course: ''
    });

    // Fetch issues when the component first loads
    useEffect(() => {
        fetchIssues();
    }, []);

    // Function to fetch issues from the server
    const fetchIssues = async () => {
        try {
            console.log('Starting to fetch issues...');
            const data = await IssueService.getIssues();
            setIssues(data);
            console.log('Issues loaded successfully:', data);
        } catch (err) {
            setError('Failed to fetch issues: ' + err.message);
            console.error('Error details:', err);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle new issue form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting new issue:', newIssue);
            const createdIssue = await IssueService.createIssue(newIssue);
            setIssues([...issues, createdIssue]); // Add the new issue to the list
            setNewIssue({ // Reset form fields after submission
                title: '',
                description: '',
                priority: 'low',
                status: 'pending',
                student_id: '',
                course: ''
            });
            console.log('Issue created successfully:', createdIssue);
        } catch (err) {
            setError('Failed to create issue: ' + err.message);
            console.error('Error creating issue:', err);
        }
    };

    // Function to update form state when user types in input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewIssue((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Show loading message while fetching data
    if (loading) return <div>Loading issues...</div>;
    // Show error message if something goes wrong
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Academic Issue Tracker</h1>

            {/* Issue Submission Form */}
            <div>
                <h2>Submit New Issue</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={newIssue.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={newIssue.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Student ID:</label>
                        <input
                            type="text"
                            name="student_id"
                            value={newIssue.student_id}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Course:</label>
                        <input
                            type="text"
                            name="course"
                            value={newIssue.course}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Priority:</label>
                        <select
                            name="priority"
                            value={newIssue.priority}
                            onChange={handleInputChange}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <button type="submit">Submit Issue</button>
                </form>
            </div>

            {/* Display List of Issues */}
            <div>
                <h2>Current Issues</h2>
                {issues.map((issue) => (
                    <div key={issue.id} style={{
                        border: '1px solid #ccc',
                        margin: '10px',
                        padding: '10px'
                    }}>
                        <h3>{issue.title}</h3>
                        <p><strong>Student ID:</strong> {issue.student_id}</p>
                        <p><strong>Course:</strong> {issue.course}</p>
                        <p><strong>Description:</strong> {issue.description}</p>
                        <p><strong>Priority:</strong> {issue.priority}</p>
                        <p><strong>Status:</strong> {issue.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IssueTracker;
