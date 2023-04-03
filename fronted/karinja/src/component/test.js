import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8001/api/jobs/";

function PaginatedList() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios.get(API_URL,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwNDMzMTQ5LCJpYXQiOjE2ODAzNDY3NDksImp0aSI6IjQ4OWQwMTQwOWYxZDRhYWRhYjEzYzIyYzQ5NTJiZjJjIiwidXNlcl9pZCI6Mn0.mjzPVmfEzvAhKrmVHONTmBDKOdwix4BodiRV6Z2DVEE`,
            "X-CSRFToken":
              "gnu99yM7oNaRBL4Pjcs88CeWmxOWW55xf2lf1E7Hyzm4UlIZKCkYRI3RL9nTjwm5",
          },
        }).then((response) => {
      setResults(response.data.results);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
      setLoading(false);
    });
  }, []);

  function handleNext() {
    setLoading(true);
    axios.get(nextUrl,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwNDMzMTQ5LCJpYXQiOjE2ODAzNDY3NDksImp0aSI6IjQ4OWQwMTQwOWYxZDRhYWRhYjEzYzIyYzQ5NTJiZjJjIiwidXNlcl9pZCI6Mn0.mjzPVmfEzvAhKrmVHONTmBDKOdwix4BodiRV6Z2DVEE`,
            "X-CSRFToken":
              "gnu99yM7oNaRBL4Pjcs88CeWmxOWW55xf2lf1E7Hyzm4UlIZKCkYRI3RL9nTjwm5",
          },
        }).then((response) => {
      setResults(response.data.results);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
      setCurrentPage(currentPage + 1);
      setLoading(false);
    });
  }

  function handlePrev() {
    setLoading(true);
    axios.get(prevUrl,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwNDMzMTQ5LCJpYXQiOjE2ODAzNDY3NDksImp0aSI6IjQ4OWQwMTQwOWYxZDRhYWRhYjEzYzIyYzQ5NTJiZjJjIiwidXNlcl9pZCI6Mn0.mjzPVmfEzvAhKrmVHONTmBDKOdwix4BodiRV6Z2DVEE`,
            "X-CSRFToken":
              "gnu99yM7oNaRBL4Pjcs88CeWmxOWW55xf2lf1E7Hyzm4UlIZKCkYRI3RL9nTjwm5",
          },
        }).then((response) => {
      setResults(response.data.results);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
      setCurrentPage(currentPage - 1);
      setLoading(false);
    });
  }

  return (
    <div className="p-4">
      <div className="bg-white shadow-lg rounded-lg px-4 py-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul>
              {results.map((result) => (
                <li key={result.id} className="my-2">
                  {result.company.username}
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-6">
              <button
                disabled={!prevUrl}
                onClick={handlePrev}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Prev
              </button>
              <span className="text-xl font-bold">{currentPage}</span>
              <button
                disabled={!nextUrl}
                onClick={handleNext}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );}
export default PaginatedList;
