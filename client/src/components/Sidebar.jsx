
import React, { useState } from "react";
import closepic from "../assets/images/close.svg";
import editpic from "../assets/images/edit.svg";
import API from "../axios"; // Import API functions

const Sidebar = ({
  openHamburger,
  handleAddBoard,
  createdBoards,
  setSelectedBoard,
  updateBoards,
  selectedBoard,
  setOpenEditBoards
}) => {
  const [showBoards, setShowBoards] = useState(false);

  const toggleShowBoards = () => {
    setShowBoards((prevState) => !prevState);
  };

  const handleEditBoard = (board) => {
    setSelectedBoard(board);
    setOpenEditBoards(true); 
  };

  const handleDeleteBoard = async (boardName) => {
    try {
      const userId = localStorage.getItem("userId");
  
      // Make a DELETE request to delete the board
      await API.delete(`/user/${userId}/board/${encodeURIComponent(boardName)}`);
  
      // Update the boards list after deletion
      updateBoards();
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };
  

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        openHamburger ? "translate-x-0" : "-translate-x-full"
      } bg-sky-800 border-r border-sky-800 sm:translate-x-0 dark:bg-sky-800 dark:border-sky-800`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-sky-800 dark:bg-sky-800">
        <ul className="space-y-2 mt-2 font-medium">
          <li>
            <button
              onClick={handleAddBoard}
              className="flex items-center w-full p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Create Boards</span>
            </button>
          </li>
        </ul>
        <ul className="space-y-2 mt-2 font-medium">
          <li>
            <button
              onClick={toggleShowBoards}
              className="flex items-center w-full p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">
                {showBoards ? "Hide" : "Show"} Boards
              </span>
            </button>
          </li>
        </ul>
        {showBoards && (
          <div className="px-3 pb-4 border-t-2 overflow-y-auto bg-gray-800 dark:bg-gray-800">
            <ul>
              {createdBoards.map((board, index) => (
                <li key={index}>
                  <div className="flex">
                    <button
                      className="flex text-center justify-center w-full p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group"
                      onClick={() => setSelectedBoard(board)}
                    >
                      {board.name}
                    </button>
                    <div className="flex">
                      <button onClick={() => handleEditBoard(board)}>
                        <img className="h-10 w-10" src={editpic} alt="Edit" />
                      </button>

                      <button onClick={() => handleDeleteBoard(board.name)}>
  <img className="h-10 w-10" src={closepic} alt="Delete" />
</button>

                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
