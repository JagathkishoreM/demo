"use client"
import React, { useState, useRef } from 'react';
import { Spotlight } from './ui/Spotlight';
import { FaCheckCircle, FaVirus } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { FaSearch, FaUpload, FaUser } from 'react-icons/fa';
import { Button } from "./ui/MovingBorder";
import Link from 'next/link';

import jsonData from './data.json'

interface GraphWithAnimationProps {
  value: number;
  redFillPercentage: number;
}

const Hero: React.FC<GraphWithAnimationProps> = () => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(1);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue >= 0 && newValue <= 96) {
      setValue(newValue);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleReanalyzeClick = () => {
    window.location.reload();
  };

  // const redFillPercentage = Math.min(value / 96, 1) * 100;

  const handleSearch = () => {
    // Update the address bar 
    if (inputValue.trim()) {
      const newUrl = `${window.location.pathname}?search=${encodeURIComponent(inputValue)}`;
      window.history.pushState(null, '', newUrl);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };



  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };



  // table config
  interface ScanResult {
    category: string;
    engine_name: string;
    result: string;
  }

  // Split the data into pairs for display  table
  const pairedData: Array<[ScanResult?, ScanResult?]> = [];
  for (let i = 0; i < jsonData.results.length; i += 2) {
    pairedData.push([jsonData.results[i], jsonData.results[i + 1]]);
  }




  //  circle fill
  // Calculate how many results are not "clean"
  const notCleanCount = jsonData.results.filter(result => result.result !== 'clean').length;

  // Calculate the fill percentage based on the number of not "clean" results and total of 96
  const redFillPercentage = (notCleanCount / 96) * 100;


  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="top-20 left-full h-[80vh] w-[50vw]" fill="purple" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.04] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="flex justify-center relative my-10 flex-col">
        <div className="flex items-start my-10 gap-20 transform -translate-x-[35px] -translate-y-[50px]">
          <Button className="bg-[#1E043F] text-white py-4 px-8 rounded-full text-center text-[18px] transition hover:bg-black-100 flex items-center justify-center mr-5 flex items-center justify-center mr-5" onClick={handleReanalyzeClick}>
            Reanalyze
          </Button>
        </div>



        <div className="status-bar flex-col space-y-6 p-5 rounded-lg shadow-md mb-5 border border-gray-400 w-[90%] md:w-[650px] h-auto md:h-[160px] transform md:translate-x-[200px] md:-translate-y-[200px]">
          <div className="flex items-center space-x-2 text-green-500">
            <span className="icon">
              <FaCheckCircle />
            </span>
            <span>No security tools have classified this URL as a threat</span>
          </div>
          <div className="url text-white">
            <p>https://www.webfox.com/gui/home</p>
            <p>www.webfox.com</p>
          </div>

          <div
            className="flex items-center justify-center w-[40px] h-[40px] bg-transparent border-[3px] border-[#FFFFFF] rounded-full transform md:translate-x-[550px] md:-translate-y-[100px] cursor-pointer"
            onClick={toggleModal}
          >
            <FiMoreVertical className="w-[20px] h-[20px] text-[#FFFFFF]" />
          </div>

          {/* Popup Modal */}
          {isOpen && (
            <div className="absolute bg-black bg-opacity-50 flex justify-center items-center transform md:translate-x-[600px] md:-translate-y-[250px] sm:translate-x-[50px] sm:-translate-y-[50px]">
              <div
                ref={modalRef}
                className="bg-white p-5 rounded-lg shadow-lg"
                style={{
                  width: "90%", // Make it responsive to smaller screens
                  maxWidth: "300px",
                  height: "auto", // Make height flexible
                  maxHeight: "260px",
                  opacity: "0.9",
                }}
              >
                {/* Editable content */}
                <div
                  contentEditable={false}
                  className="text-gray-700 border border-gray-300 p-3 rounded focus:outline-none"
                >
                  Status : 200
                </div>
                <div
                  contentEditable={false}
                  className="text-gray-700 border border-gray-300 p-3 rounded focus:outline-none"
                >
                  Content type : text/html
                </div>
                <div
                  contentEditable={false}
                  className="text-gray-700 border border-gray-300 p-3 rounded focus:outline-none"
                >
                  Last Analysis Date : 1 day ago
                </div>
                <div
                  contentEditable={false}
                  className="text-gray-700 border border-gray-300 p-3 rounded focus:outline-none"
                >
                  external-resources
                </div>
              </div>
            </div>
          )}
        </div>


        <div>
          <div
            className={`relative flex items-center justify-center w-[150px] h-[150px] transform translate-x-[1120px] -translate-y-[380px] transition-transform duration-500 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >

            {/* Outer ring */}
            <div className="absolute w-[150px] h-[150px] bg-transparent border-[8px] border-[#0000FF] rounded-full"></div>

            {/* Inner filled ring */}
            <div
              className="absolute w-[150px] h-[150px] bg-transparent border-[8px] border-[#00FFFF] rounded-full"
              style={{
                background: `conic-gradient(red 0% ${redFillPercentage}%, transparent ${redFillPercentage}% 100%)`,
                maskImage: 'linear-gradient(white, white)',
                transition: 'background 0.3s ease-out',
              }}
            ></div>

            {/* Inner content */}
            <div className="relative flex flex-col items-center justify-center w-[150px] h-[150px]">
              <div className="absolute top-[50%] transform -translate-y-[50%] inline-block break-words font-['ABeeZee'] font-normal text-[30px] text-[#FFFFFF]">
                {notCleanCount}
              </div>
              <span className="absolute bottom-[10px] break-words font-['ABeeZee'] font-normal text-[30px] text-[#FFFFFF]">
                / 96
              </span>
            </div>

          </div>
        </div>



        <div className="relative left-[50%] sm:left-[30%] top-[40%] w-[90%] sm:w-[370px] h-[50px] bg-transparent border-[3px] border-[#FFFFFF] rounded-full transform translate-x-[-50%] sm:translate-x-[30px] -translate-y-[360px]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full h-full bg-transparent outline-none text-white pl-4 pr-14 caret-white"
            style={{ whiteSpace: 'nowrap' }}
          />
        </div>




        <div className="absolute left-[80%] sm:left-[49.5%] top-[100%] w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-[#030029] bg-opacity-0 rounded-full flex items-center justify-center transform translate-x-[-50%] sm:translate-x-[100px] -translate-y-[410px] cursor-pointer" onClick={handleSearch}>
          <FaSearch className="text-white text-xl sm:text-2xl" />
        </div>

        <div className="absolute left-[85%] sm:left-[53%] top-[100%] flex items-center justify-center w-[50px] sm:w-[90px] h-[40px] sm:h-[50px] transform translate-x-[-50%] sm:translate-x-[100px] -translate-y-[410px] cursor-pointer" onClick={handleIconClick}>
          <FaUpload className="text-white text-lg sm:text-xl" />
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
        </div>

      </div>



      <div className="flex-grow p-4 relative flex flex-col mt-20 transform translate-x-[0px] -translate-y-[400px]">
        <div className="flex flex-col lg:flex-row lg:items-start">
          <h3 className="text-white text-[22px] transform translate-x-[15px] -translate-y-[0px]">
            Security vendors' analysis
          </h3>
          <h3 className="text-white text-[22px] lg:translate-x-[420px] translate-y-[0px]">
            Do you want to automate checks?
          </h3>
        </div>

        <div className="p-5 rounded-lg w-full lg:w-[85%] h-auto">

          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Scan Results</h1>
            <table className="w-full border-collapse">
              {/* Table Headings */}
              <thead>
                <tr>
                  <th className="py-4 px-2 sm:px-4 text-center">Engine Name</th>
                  <th className="py-4 px-2 sm:px-4 text-center">Result</th>
                  <th className="py-4 px-2 sm:px-4 text-center">Engine Name</th>
                  <th className="py-4 px-2 sm:px-4 text-center">Result</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {pairedData.map((pair, index) => (
                  <tr key={index} className="border-b border-gray-500">
                    {/* First Column Data */}
                    <td className="py-4 px-2 sm:px-4 flex items-center">{pair[0]?.engine_name}</td>
                    <td className="py-4 px-2 sm:px-4 text-center">
                      <div className="flex items-center justify-center">
                        {pair[0]?.result === 'clean' ? (
                          <FaCheckCircle className="text-green-400 mr-2" />
                        ) : (
                          <FaVirus className="text-red-400 mr-2" />
                        )}
                        <span>{pair[0]?.result}</span>
                      </div>
                    </td>

                    {/* Second Column Data */}
                    {pair[1] && (
                      <>
                        <td className="py-4 px-2 sm:px-4 flex items-center justify-end">{pair[1]?.engine_name}</td>
                        <td className="py-4 px-2 sm:px-4 text-center">
                          <div className="flex items-center justify-center">
                            {pair[1]?.result === 'clean' ? (
                              <FaCheckCircle className="text-green-400 mr-2" />
                            ) : (
                              <FaVirus className="text-red-400 mr-2" />
                            )}
                            <span>{pair[1]?.result}</span>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        </div>

      </div>


      <div className="absolute bottom-20 right-10 flex flex-col gap-10 transform translate-x-[0px] -translate-y-[430px]">

        <Button className="bg-[#1E043F] text-white py-4 px-8 rounded-full text-center text-[18px] transition hover:bg-black-100 flex items-center justify-center mr-5">Detection</Button>
        <Link href="./phishingdetails">
          <Button className="bg-[#1E043F] text-white py-4 px-8 rounded-full text-center text-[18px] transition hover:bg-black-100 flex items-center justify-center mr-12">Details</Button></Link>
        <Link href="./phishingcomments">
          <Button className="bg-[#1E043F] text-white py-4 px-8 rounded-full text-center text-[18px] transition hover:bg-black-100 flex items-center justify-center mr-5">Comments</Button></Link>
      </div>
    </div>
  );
};

export default Hero;


