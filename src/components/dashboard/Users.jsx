import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loading, Error } from '../index';

const fetchUsersByPage = async (page) => {
  const response = await axios.get(`https://reqres.in/api/users/?page=${page}`);
  return response.data;
};

const fetchAllUsers = async () => {
  let allUsers = [];
  let page = 1;
  let totalPages = 1;

  do {
    const response = await axios.get(`https://reqres.in/api/users/?page=${page}`);
    allUsers = [...allUsers, ...response.data.data];
    totalPages = response.data.total_pages;
    page++;
  } while (page <= totalPages);

  return allUsers;
};

const Users = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch paginated users
  const {
    data: paginatedData,
    isLoading: isPaginatedLoading,
    isError: isPaginatedError,
  } = useQuery({
    queryKey: ['users', pageNo],
    queryFn: () => fetchUsersByPage(pageNo),
    keepPreviousData: true,
  });

  const {
    data: allUsers,
    isLoading: isAllUsersLoading,
    isError: isAllUsersError,
  } = useQuery({
    queryKey: ['allUsers'],
    queryFn: fetchAllUsers,
  });

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers([]);
    } else if (allUsers) {
      const filtered = allUsers.filter((user) =>
        `${user.first_name} ${user.last_name} ${user.email}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, allUsers]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (paginatedData?.total_pages || 1)) {
      setPageNo(newPage);
    }
  };

  if (isPaginatedLoading || isAllUsersLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Loading className="w-20" />
      </div>
    );
  }

  if (isPaginatedError || isAllUsersError) {
    return <Error />;
  }

  return (
    <div className="overflow-x-auto min-h-screen">
      {successMessage && (
        <div className="alert alert-success my-5">
          <div>
            <span>{successMessage}</span>
          </div>
        </div>
      )}
      <div className=" my-4 mb-8 flex justify-center items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="table rounded-md">
        <thead>
          <tr className="bg-base-200">
            <th>ID</th>
            <th>Avatar</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {(searchQuery.trim() === '' ? paginatedData?.data : filteredUsers || []).map((user) => (
            <tr key={user.id} className="hover">
              <td>{user.id}</td>
              <td>
                <div className="avatar">
                  <div className="w-8 mask mask-squircle">
                    <img
                      src={
                        user.avatar ||
                        'https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp'
                      }
                      alt={user.username}
                    />
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {searchQuery.trim() !== '' && filteredUsers.length === 0 && (
        <div className="text-center mt-4">No users found.</div>
      )}
      {searchQuery.trim() === '' && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handlePageChange(pageNo - 1)}
            disabled={pageNo <= 1}
          >
            Previous
          </button>
          <span className="text-sm">
            Page {pageNo} of {paginatedData?.total_pages}
          </span>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handlePageChange(pageNo + 1)}
            disabled={pageNo >= (paginatedData?.total_pages || 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;