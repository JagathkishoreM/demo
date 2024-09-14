"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Spotlight } from '@/src/components/ui/Spotlight';
import { FaCheckCircle } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { FaSearch, FaUpload, FaUser } from 'react-icons/fa';
import { Button } from "@/src/components/ui/MovingBorder";
import Link from 'next/link';

interface GraphWithAnimationProps {
  value: number;
  redFillPercentage: number;
}

const CommentsHero: React.FC<GraphWithAnimationProps> = () => {
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

  const redFillPercentage = Math.min(value / 96, 1) * 100;

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

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
  //     setIsOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isOpen]);

  // const handleReanalyzeClick = () => {
  //   // Reload the page and update the address bar with the search input
  //   const newUrl = `${window.location.pathname}?search=${encodeURIComponent(inputValue)}`;
  //   window.location.assign(newUrl);
  // };


  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // const [activePage, setActivePage] = useState<string>('Detection');

  // const handleButtonClick = (page: string) => {
  //   setActivePage(page);
  // };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };



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

        <div className="status-bar flex-col space-y-6 p-5 rounded-lg shadow-md mb-5 border border-gray-400 w-[650px] h-[160px] transform translate-x-[200px] -translate-y-[200px]">
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

          <div className="flex items-center justify-center w-[40px] h-[40px] bg-transparent border-[3px] border-[#FFFFFF] rounded-full transform translate-x-[550px] -translate-y-[100px] cursor-pointer" onClick={toggleModal} >
            <FiMoreVertical className="w-[20px] h-[20px] text-[#FFFFFF]" />
          </div>
          {/* Popup Modal */}
          {isOpen && (
            <div className="absolute bg-black bg-opacity-50 flex justify-center items-center transform translate-x-[600px] -translate-y-[250px]">
              <div
                ref={modalRef}
                className="bg-white p-5 rounded-lg shadow-lg"
                style={{
                  width: "300px",
                  height: "240px",
                  opacity: "0.9",
                }}
              >
                {/* Close button */}
                {/* <button
              onClick={toggleModal}
              className="text-gray-500 absolute top-2 right-2"
            >
              &times;
            </button> */}

                {/* Editable content */}
                <div
                  contentEditable={false}
                  className="text-gray-700 border border-gray-300 p-3 rounded focus:outline-none"
                >
                  Status :
                  200
                </div>
                <div
                  contentEditable={false}
                  className="text-gray-700 border border-gray-300 p-3 rounded focus:outline-none"
                >
                  Content type :
                  text/html

                </div>
                <div
                  contentEditable={false}
                  className="text-gray-700 border border-gray-300 p-3 rounded focus:outline-none"
                >
                  Last Analysis Date :
                  1 day ago

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
          {/* <div className="relative flex items-center justify-center w-[150px] h-[150px] transform translate-x-[1120px] -translate-y-[450px]">
            <div className="absolute w-[150px] h-[150px] bg-transparent border-[8px] border-[#0000FF] rounded-full"></div>
            <div
              className="absolute w-[150px] h-[150px] bg-transparent border-[8px] border-[#00FFFF] rounded-full"
              style={{
                background: `conic-gradient(red 0% ${redFillPercentage}%, transparent ${redFillPercentage}% 100%)`,
                maskImage: 'linear-gradient(white, white)',
                transition: 'background 0.3s ease-out',
              }}
            ></div>
            <div className="relative flex flex-col items-center justify-center w-[150px] h-[150px]">
              <div className="absolute top-[50%] transform -translate-y-[50%] inline-block break-words font-['ABeeZee'] font-normal text-[30px] text-[#FFFFFF]">
                {value}
              </div>
              <span className="absolute bottom-[10px] break-words font-['ABeeZee'] font-normal text-[30px] text-[#FFFFFF]">
                / 96
              </span>
            </div>
          </div> */}
          <div
            className={`relative flex items-center justify-center w-[150px] h-[150px] transform translate-x-[1120px] -translate-y-[380px] transition-transform duration-500 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'}`}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
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
                {value}
              </div>
              <span className="absolute bottom-[10px] break-words font-['ABeeZee'] font-normal text-[30px] text-[#FFFFFF]">
                / 96
              </span>
            </div>
          </div>

          <div className="mt-5 flex justify-center transform translate-x-[560px] -translate-y-[360px]">
            <input
              type="number"
              min="0"
              max="96"
              value={value}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="relative left-[30%] top-[40%] w-[370px] h-[50px] bg-transparent border-[3px] border-[#FFFFFF] rounded-full transform translate-x-[30px] -translate-y-[360px]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full h-full bg-transparent outline-none text-white pl-4 pr-14 caret-white"
            style={{ whiteSpace: 'nowrap' }}
          />
        </div>


        <div className="absolute left-[49.5%] top-[100%] w-[50px] h-[50px] bg-[#030029] bg-opacity-0 rounded-full flex items-center justify-center transform translate-x-[100px] -translate-y-[410px] cursor-pointer" onClick={handleSearch} >
          <FaSearch className="text-white text-2xl" />
        </div>


        <div className="absolute left-[53%] top-[100%] flex items-center justify-center w-[90px] h-[50px] transform translate-x-[100px] -translate-y-[410px] cursor-pointer" onClick={handleIconClick}>
          <FaUpload className="text-white text-xl" />
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
        </div>
      </div>

      <div className="rounded-[30px] relative flex flex-col p-[41px_0_48px_20px] w-[700px] h-[600px] translate-x-[250px] -translate-y-[400px]">
        <div className="m-[0_auto_30px_auto] inline-block self-center break-words font-['Times_New_Roman','Roboto_Condensed'] font-normal text-[28px] text-[#FFFFFF]">
          Add your comments
        </div>

        <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-md w-full max-w-2xl">
          <div className="mb-6">
            <label htmlFor="name" className="block text-base font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 block w-full px-5 py-4 border border-gray-300 border-3 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-base font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 block w-full px-5 py-4 border border-gray-300 border-3 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="comment" className="block text-base font-medium text-gray-300">
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="mt-2 block w-full px-5 py-4 border border-gray-300 border-3 rounded-3xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              rows={8}
              required
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[200px] justify-center bg-[#1E043F] text-white py-3 px-5 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Post
            </button>
          </div>
        </form>
      </div>


      <div className="absolute bottom-20 right-10 flex flex-col gap-10 transform translate-x-[0px] -translate-y-[560px]">
        <Link href="/">
          <Button className="bg-[#1E043F] text-white py-4 px-8 rounded-full text-center text-[18px] transition hover:bg-black-100 flex items-center justify-center mr-5">Detection</Button></Link>
        <Link href="./phishingdetails">
          <Button className="bg-[#1E043F] text-white py-4 px-8 rounded-full text-center text-[18px] transition hover:bg-black-100 flex items-center justify-center mr-12">Details</Button></Link>
        <Button className="bg-[#1E043F] text-white py-4 px-8 rounded-full text-center text-[18px] transition hover:bg-black-100 flex items-center justify-center mr-5">Comments</Button>
      </div>
    </div>
  );
};

export default CommentsHero;
