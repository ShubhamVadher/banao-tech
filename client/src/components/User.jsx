import React, { useState, useEffect } from "react";

const User = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const companiesPerPage = 3;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await res.json();
      setUsers(data);

      // Group users by company
      const companyMap = {};

      data.forEach((user) => {
        const companyName = user.company.name;

        if (!companyMap[companyName]) {
          companyMap[companyName] = [];
        }

        companyMap[companyName].push(user);
      });

      setCompanies(companyMap);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Convert object to array for sorting
  const companyEntries = Object.entries(companies);

  // Sort companies
  const sortedCompanies = companyEntries.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[0].localeCompare(b[0]);
    } else {
      return b[0].localeCompare(a[0]);
    }
  });

  // Pagination
  const indexOfLast = currentPage * companiesPerPage;
  const indexOfFirst = indexOfLast - companiesPerPage;
  const currentCompanies = sortedCompanies.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    sortedCompanies.length / companiesPerPage
  );

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white px-6 py-28">
      <div className="max-w-6xl mx-auto bg-[#16161d] p-8 rounded-2xl border border-[#222] shadow-xl">

        <h1 className="text-3xl font-semibold mb-8">
          Companies & All User Details
        </h1>

        {/* Sort */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <label className="text-gray-400 mr-3">
              Sort by Company Name:
            </label>
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#0b0b0f] border border-[#222] p-2 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </div>

          <div className="text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Company Sections */}
        <div className="space-y-12">
          {currentCompanies.map(([companyName, companyUsers]) => (
            <div key={companyName}>

              {/* Company Title */}
              <h2 className="text-2xl font-semibold text-purple-400 mb-6">
                {companyName}
              </h2>

              {/* All Users in Company */}
              <div className="space-y-6">
                {companyUsers.map((user) => (
                  <div
                    key={user.id}
                    className="bg-[#0b0b0f] border border-[#222] p-6 rounded-xl hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition"
                  >
                    <p><span className="text-gray-400">ID:</span> {user.id}</p>
                    <p><span className="text-gray-400">Name:</span> {user.name}</p>
                    <p><span className="text-gray-400">Username:</span> {user.username}</p>
                    <p><span className="text-gray-400">Email:</span> {user.email}</p>
                    <p><span className="text-gray-400">Phone:</span> {user.phone}</p>
                    <p><span className="text-gray-400">Website:</span> {user.website}</p>

                    <div className="mt-3">
                      <p className="text-gray-400">Address:</p>
                      <p className="text-sm text-gray-300">
                        {user.address.street}, {user.address.suite},{" "}
                        {user.address.city} - {user.address.zipcode}
                      </p>
                      <p className="text-sm text-gray-300">
                        Geo: {user.address.geo.lat}, {user.address.geo.lng}
                      </p>
                    </div>

                    <div className="mt-3">
                      <p className="text-gray-400">Company Info:</p>
                      <p className="text-sm text-gray-300">
                        Catchphrase: {user.company.catchPhrase}
                      </p>
                      <p className="text-sm text-gray-300">
                        Business: {user.company.bs}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            className="px-4 py-2 bg-[#0b0b0f] border border-[#222] rounded-lg disabled:opacity-30 hover:border-purple-500 transition"
          >
            Previous
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            className="px-4 py-2 bg-[#0b0b0f] border border-[#222] rounded-lg disabled:opacity-30 hover:border-purple-500 transition"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default User;
