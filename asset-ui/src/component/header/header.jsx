import React, {useEffect, useState} from 'react';
import { Bell, Menu, User, Search, LogOut, Settings, ChevronDown } from 'lucide-react';
import axios from "axios";
import {config, token} from "../../config";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState({});
  const getInfo = async () => {
    const  mockUser = null
    try {
      const {data} = await axios.get(`http://localhost:5000/user-accounts/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setUser(data)
    } catch (err) {

    }

  };
  // Mock user data - replace with your actual auth system
  useEffect(() => {
    getInfo();
  },[])

  return (
    <div className="bg-blue-600 text-white shadow-md">
      {/* Main header bar */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <div className="flex items-center">
            <button 
              className="md:hidden p-2 rounded-md text-blue-200 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
            <div className="flex-shrink-0 font-bold text-xl">
              Quản lý tài sản
            </div>
          </div>
          
          {/* Search bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-blue-300" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 rounded-md bg-blue-700 border border-blue-500 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-white"
                type="text"
                placeholder="Tìm kiếm tài sản..."
              />
            </div>
          </div>
          
          {/* Right navigation items */}
          <div className="flex items-center">
            {/* Notifications */}
            <button className="p-2 rounded-full text-blue-200 hover:text-white">
              <Bell size={20} />
            </button>
            
            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                <button
                  className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <span className="mr-2 hidden sm:block">{user.username}</span>
                  <div className="bg-blue-800 p-1 rounded-full">
                    <User size={24} className="text-blue-200" />
                  </div>
                  <ChevronDown size={16} className="ml-1" />
                </button>
              </div>
              
              {/* Profile dropdown menu */}
              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="px-4 py-2 text-blue-900 border-b">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-blue-600">Vai trò: {user.role}</p>
                    {/*<p className="text-xs text-blue-600">Phòng ban: {mockUser.department}</p>*/}
                  </div>
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <User size={16} className="mr-2" />
                    Hồ sơ
                  </a>
                  {user?.role === 'ddmin' && (
                    <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <Settings size={16} className="mr-2" />
                      Cài đặt hệ thống
                    </a>
                  )}
                  <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <LogOut size={16} className="mr-2" />
                    Đăng xuất
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-800">
              Trang chủ
            </a>
            <a href="#assets" className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-800">
              Danh sách tài sản
            </a>
            <a href="#maintenance" className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-800">
              Lịch bảo trì
            </a>
            {user?.role === 'admin' && (
              <a href="#users" className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-800">
                Quản lý người dùng
              </a>
            )}
            <a href="#reports" className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-800">
              Báo cáo
            </a>
            <div className="relative mt-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-blue-300" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 rounded-md bg-blue-800 border border-blue-600 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-white"
                type="text"
                placeholder="Tìm kiếm tài sản..."
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop navigation menu */}
      <div className="hidden md:block bg-blue-700">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-10">
            <a href="#dashboard" className="px-3 py-1 rounded-md text-sm font-medium text-white bg-blue-800">
              Trang chủ
            </a>
            <a href="#assets" className="px-3 py-1 rounded-md text-sm font-medium text-blue-200 hover:text-white hover:bg-blue-800 ml-4">
              Danh sách tài sản
            </a>
            <a href="#maintenance" className="px-3 py-1 rounded-md text-sm font-medium text-blue-200 hover:text-white hover:bg-blue-800 ml-4">
              Lịch bảo trì
            </a>
            {user?.role === 'admin' && (
              <a href="#users" className="px-3 py-1 rounded-md text-sm font-medium text-blue-200 hover:text-white hover:bg-blue-800 ml-4">
                Quản lý người dùng
              </a>
            )}
            <a href="#reports" className="px-3 py-1 rounded-md text-sm font-medium text-blue-200 hover:text-white hover:bg-blue-800 ml-4">
              Báo cáo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;