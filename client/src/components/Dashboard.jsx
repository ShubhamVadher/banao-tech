import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("Error fetching users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate unique companies dynamically
  const uniqueCompanies = [
    ...new Set(users.map((user) => user.company.name)),
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0f] text-white">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0f] text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white px-6 py-28">
      <div className="max-w-4xl mx-auto bg-[#16161d] p-8 rounded-2xl border border-[#222] shadow-xl">

        <h1 className="text-3xl font-semibold mb-8">
          Users Summary
        </h1>

        {/* Total Users */}
        <div className="mb-6">
          <p className="text-lg">
            Total Users Returned:
            <span className="text-pink-400 ml-2 font-bold">
              {users.length}
            </span>
          </p>
        </div>

        {/* Unique Companies */}
        <div className="mb-6">
          <p className="text-lg">
            Unique Companies:
            <span className="text-purple-400 ml-2 font-bold">
              {uniqueCompanies.length}
            </span>
          </p>
        </div>

        {/* Company List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Company Names:
          </h2>

          <ul className="space-y-3">
            {uniqueCompanies.map((company, index) => (
              <li
                key={index}
                className="bg-[#0b0b0f] border border-[#222] p-3 rounded-lg hover:border-purple-500 transition"
              >
                {company}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
