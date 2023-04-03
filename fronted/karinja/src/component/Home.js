import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStates } from "../hook/state";
import { useCity } from "../hook/city";

function PaginatedList() {
  const [results, setResults] = useState([]);
  const [count, setCount] = useState();
  const [search, setSearch] = useState(null);
  const [state, setState] = useState(0);
  const [cities, setCity] = useState(0);
  const [type, steType] = useState(0);
  const [military_status, steMilitary_status] = useState(0);

  const [sex, setSex] = useState();

  const API_URL = `http://127.0.0.1:8001/api/jobs/?${
    !!search ? "search=" + search : ""
  }${!!state ? "&city__state=" + state : ""}${
    !!cities ? "&city=" + cities : ""
  }${!!type ? "&typ=" + type : ""}${!!sex ? "&sex=" + sex : ""}${
    !!military_status ? "&military_status=" + military_status : ""
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
  }, [search, state, cities, type, sex, military_status]);

  function generateNumbers() {
    for (let i = 1; i <= count / 20; i++) {
      setNumbers(numbers.push(i));
    }

    return numbers;
  }

  const onOptionChange = (e) => {
    steType(e.target.value);
  };
  const onSexChange = (e) => {
    setSex(e.target.value);
  };
  const onMilitaryStatusChange = (e) => {
    steMilitary_status(e.target.value);
  };
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
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="state"
              >
                State
              </label>
              <select
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                value={cities}
                onChange={(e) => setCity(e.target.value)}
              >
                {city?.results?.map((i) => (
                  <option value={i.id}>{i.title}</option>
                ))}
              </select>
            </div>

            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="city"
              >
                City
              </label>
              <select
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                {states?.results?.map((i) => (
                  <option value={i.id}>{i.title}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="accountType"
                >
                  Type
                </label>
                <div class="ml-3 mt-1">
                  <div class="flex items-center mb-2">
                    <input
                      class="form-radio h-4 w-4 text-indigo-600"
                      type="radio"
                      name="accountType"
                      value="0"
                      id="full-time"
                      checked={type === "0"}
                      onChange={onOptionChange}
                    />
                    <label
                      class="ml-2 block text-gray-900 font-medium"
                      for="full-time"
                    >
                      Full time
                    </label>
                  </div>

                  <div class="flex items-center mb-2">
                    <input
                      class="form-radio h-4 w-4 text-indigo-600"
                      type="radio"
                      name="accountType"
                      value="1"
                      id="part-time"
                      checked={type === "1"}
                      onChange={onOptionChange}
                    />
                    <label
                      class="ml-2 block text-gray-900 font-medium"
                      for="part-time"
                    >
                      Part time
                    </label>
                  </div>

                  <div class="flex items-center mb-2">
                    <input
                      class="form-radio h-4 w-4 text-indigo-600"
                      type="radio"
                      name="accountType"
                      value="2"
                      id="remote"
                      checked={type === "2"}
                      onChange={onOptionChange}
                    />
                    <label
                      class="ml-2 block text-gray-900 font-medium"
                      for="remote"
                    >
                      Remote
                    </label>
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="sex"
                >
                  Sex
                </label>
                <div class="ml-3 mt-1">
                  <div class="flex items-center mb-2">
                    <input
                      class="form-radio h-4 w-4 text-indigo-600"
                      type="radio"
                      name="sex"
                      value="1"
                      id="male"
                      checked={sex === "1"}
                      onChange={onSexChange}
                    />
                    <label
                      class="ml-2 block text-gray-900 font-medium"
                      for="male"
                    >
                      Male
                    </label>
                  </div>

                  <div class="flex items-center mb-2">
                    <input
                      class="form-radio h-4 w-4 text-indigo-600"
                      type="radio"
                      name="sex"
                      value="2"
                      id="female"
                      checked={sex === "2"}
                      onChange={onSexChange}
                    />
                    <label
                      class="ml-2 block text-gray-900 font-medium"
                      for="female"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="military_status"
                >
                  Military Status
                </label>
                <div class="ml-3 mt-1">
                  <div class="flex items-center mb-2">
                    <input
                      class="form-radio h-4 w-4 text-indigo-600"
                      type="radio"
                      name="military_status"
                      value="0"
                      id="included"
                      checked={military_status === "0"}
                      onChange={onMilitaryStatusChange}
                    />
                    <label
                      class="ml-2 block text-gray-900 font-medium"
                      for="included"
                    >
                      Included
                    </label>
                  </div>

                  <div class="flex items-center mb-2">
                    <input
                      class="form-radio h-4 w-4 text-indigo-600"
                      type="radio"
                      name="military_status"
                      value="1"
                      id="done"
                      checked={military_status === "1"}
                      onChange={onMilitaryStatusChange}
                    />
                    <label
                      class="ml-2 block text-gray-900 font-medium"
                      for="done"
                    >
                      Done
                    </label>
                  </div>

                  <div class="flex items-center mb-2">
                    <input
                      class="form-radio h-4 w-4 text-indigo-600"
                      type="radio"
                      name="military_status"
                      value="2"
                      id="exempt"
                      checked={military_status === "2"}
                      onChange={onMilitaryStatusChange}
                    />
                    <label
                      class="ml-2 block text-gray-900 font-medium"
                      for="exempt"
                    >
                      Exempt
                    </label>
                  </div>

                  <div class="flex items-center mb-2">
                    <input
                      class="form-radio h-4 w-4 text-indigo-600"
                      type="radio"
                      name="military_status"
                      id="no-matter"
                      value="3"
                      checked={military_status === "3"}
                      onChange={onMilitaryStatusChange}
                    />
                    <label
                      class="ml-2 block text-gray-900 font-medium"
                      for="no-matter"
                    >
                      No Matter
                    </label>
                  </div>
                </div>
              </div>
            </div>

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
                        <th class="px-6 py-3 text-left">Title</th>
                        <th class="px-6 py-3 text-left">Company</th>
                        <th class="px-6 py-3 text-left">State</th>
                        <th class="px-6 py-3 text-left">City</th>
                        <th class="px-6 py-3 text-left">Military Status</th>
                        <th class="px-6 py-3 text-left"></th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      {results.map((item) => (
                        <tr key={item.id} class="hover:bg-gray-100">
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">
                              {item.title}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500 truncate ">
                              {item.company.username}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {item.city.state.title}
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {item.city.title}
                            </span>
                          </td>
                          <td class="px-6 inline-flex text-xs leading-5 font-semibold rounded-full mt-8 bg-blue-100 text-teal-800">
                          {item.military_status === 0
                              ? "Concluded"
                              : item.military_status === 1
                              ? "Done"
                              : item.military_status === 2
                              ? "Exempt"
                              : "No Matter"}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button onClick={() =>window.location.href = item.id} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded me-4">
                              Further Information
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
export default PaginatedList;
