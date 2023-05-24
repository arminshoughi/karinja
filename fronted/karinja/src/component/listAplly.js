import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStates } from "../hook/state";
import { useCity } from "../hook/city";

function ListApply() {
  const [results, setResults] = useState([]);
  const [count, setCount] = useState();
  const [search, setSearch] = useState(null);
  const [state, setState] = useState(0);
  const [cities, setCity] = useState(0);
  const [type, steType] = useState(0);
  const [military_status, steMilitary_status] = useState(0);

  const [sex, setSex] = useState();

  const API_URL = `http://127.0.0.1:8001/api/jobs/employee/?${
    !!search ? "search=" + search : ""
  }`;
  const { data: states } = useStates();
  const { data: city } = useCity(state);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [numbers, setNumbers] = useState([]);

  console.log(sex, "asd");

  const [generateNumber, setGenerateNumbers] = useState([]);
  const access = localStorage.getItem("access");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${access}`,
          "X-CSRFToken":
            "gnu99yM7oNaRBL4Pjcs88CeWmxOWW55xf2lf1E7Hyzm4UlIZKCkYRI3RL9nTjwm5",
        },
      })
      .then((response) => {
        setResults(response.data.results);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        setCount(response.data.count);

        setLoading(false);
      });
  }, [search]);

  function generateNumbers() {
    for (let i = 1; i <= count / 20; i++) {
      setNumbers(numbers.push(i));
    }

    return numbers;
  }

  
  useEffect(() => {
    setGenerateNumbers(generateNumbers());
  }, []);

  function handleNext() {
    setLoading(true);
    axios
      .get(nextUrl, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${access}`,

          "X-CSRFToken":
            "gnu99yM7oNaRBL4Pjcs88CeWmxOWW55xf2lf1E7Hyzm4UlIZKCkYRI3RL9nTjwm5",
        },
      })
      .then((response) => {
        setResults(response.data.results);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        setCurrentPage(currentPage + 1);
        setLoading(false);
      });
  }

  function handlePrev() {
    setLoading(true);
    axios
      .get(prevUrl, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${access}`,

          "X-CSRFToken":
            "gnu99yM7oNaRBL4Pjcs88CeWmxOWW55xf2lf1E7Hyzm4UlIZKCkYRI3RL9nTjwm5",
        },
      })
      .then((response) => {
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
           


            <div class="p-4">
              <h1 class="font-bold text-lg mb-4">Jobs</h1>
              <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-4 border-b border-gray-200">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    class="w-1/3 focus:outline-none focus:ring focus:border-blue-300 border-gray-300 rounded-md py-2 px-4"
                    placeholder="Search..."
                  />
                </div>

                <div class="p-4">
                  <table class="w-full table-auto">
                    <thead class="bg-gray-50">
                      <tr class="text-xs font-medium text-gray-500 uppercase tracking-wider"> 
                      <th class="px-6 py-3 text-left">#</th>
                        <th class="px-6 py-3 text-left">Title</th>
                        <th class="px-6 py-3 text-left">Company</th>
                        <th class="px-6 py-3 text-left">State</th>
                        <th class="px-6 py-3 text-left">City</th>
                        <th class="px-6 py-3 text-left">Status</th>

                        <th class="px-6 py-3 text-left">Military Status</th>
                        <th class="px-6 py-3 text-left"></th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {results.map((item , index) => (
                        
                        <tr key={item.id} class="hover:bg-gray-100">
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">
                              {(currentPage - 1) * 20 + index + 1}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">
                              {console.log(item.job.military_status , "asdss")}
                              {item.job.title}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500 truncate ">
                              {item.job.company?.username}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {item.job.city?.state?.title}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {item?.job.city?.title}
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {item?.status === 0
                              ? "initial"
                              : item.job.military_status === 1
                              ? "Pending"
                              : item.job.military_status === 2
                              ? "accept"
                              : "ReJect"}
                            </span>
                          </td>
                          <td class="px-6 inline-flex text-xs leading-5 font-semibold rounded-full mt-8 bg-blue-100 text-teal-800">
                            {item.job.military_status === 0
                              ? "Concluded"
                              : item.job.military_status === 1
                              ? "Done"
                              : item.job.military_status === 2
                              ? "Exempt"
                              : "No Matter"}
                          </td>
                          
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button onClick={() =>window.location.href = "requests/" +item.id} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded me-4">
                          more
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

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
  );
}
export default ListApply;
