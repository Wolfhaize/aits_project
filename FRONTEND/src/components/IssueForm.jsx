import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // Use AuthContext to get the logged-in user

const IssueForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // Add category field
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useAuth(); // Get the logged-in user from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (!user || !user.student_number) {
        setError("Student number not found. Please log in again.");
        return;
      }

      // Log the request payload for debugging
      const payload = {
        title,
        description,
        category, // Include category
        student_number: user.student_number,// Use the student's number
        user: 1, 
        assigned_to: null,
        status: "open", // Default status as per the model
      };
      console.log("Request Payload:", payload);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/issues/",
        payload,
        {
          headers: {
            Authorization: `Token ${user.token}`, // Include the token in the headers
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Issue submitted successfully!");
        setTitle("");
        setDescription("");
        setCategory(""); // Reset category field
      } else {
        setError("Failed to submit issue. Please try again.");
      }
    } catch (error) {
      console.error("Issue submission failed:", error);

      // Log the server's error response for debugging
      if (error.response) {
        console.error("Server Error Response:", error.response.data);
        setError(
          error.response.data.detail ||
            "Failed to submit issue. Please check the data and try again."
        );
      } else {
        setError("Failed to submit issue. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Submit an Issue</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Issue Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>Select Category</option>
          <option value="missing_marks">Missing Marks</option>
          <option value="appeal">Appeal</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
};

export default IssueForm;