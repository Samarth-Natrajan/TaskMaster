// Home.js

import React, { useEffect, useState } from 'react';
import API from '../../axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Boards from '../../components/Boards';
import CreateBoards from '../../components/CreateBoards';

const Home = () => {
  const [openHamburger, setOpenHamburger] = useState(false);
  const [openCreateBoards, setOpenCreateBoards] = useState(false);
  const [createdBoards, setCreatedBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null); // State to store selected board details
  const [userDetail, setUserDetail] = useState({});
  const [error, setError] = useState("");

  const userId = localStorage.getItem('userId');

  const getUserDetail = async () => {
    try {
      const res = await API.get(`/user/${userId}`);
      setUserDetail(res.data)
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getUserDetail();
    getBoards(); // Fetch boards when the component mounts
  }, [])

  const getBoards = async () => {
    try {
      const res = await API.get(`/user/${userId}/getboards`);
      setCreatedBoards(res.data); // Set the fetched boards to state
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  }

  const handleHamburger = () => {
    setOpenHamburger(prevState => !prevState);
  };

  const handleAddBoard = () => {
    setOpenCreateBoards(true);
  };

  const handleCloseModal = () => {
    setOpenCreateBoards(false);
    getBoards(); // Fetch updated boards when a new board is created
  };

  const selectBoard = (board) => {
    setSelectedBoard(board); // Set selected board details to state
  };

  // Function to update boards after creation
  const updateBoards = () => {
    getBoards();
  };

  return (
    <>
      <Navbar handleHamburger={handleHamburger} userDetail={userDetail} />
      <Sidebar openHamburger={openHamburger} handleAddBoard={handleAddBoard} createdBoards={createdBoards} setSelectedBoard={selectBoard} />
      <Boards selectedBoard={selectedBoard} /> {/* Pass selected board details to Boards component */}
      {openCreateBoards && <CreateBoards handleCloseModal={handleCloseModal} updateBoards={updateBoards} />}
    </>
  );
};

export default Home;
