import React from 'react';
import { Heart, Mail, Phone, HelpCircle, FileText, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="bg-gray-800 text-gray-300">
      {/* Main footer content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quản lý tài sản</h3>
            <p className="mb-4 text-sm">
              Hệ thống quản lý tài sản toàn diện giúp doanh nghiệp theo dõi, bảo trì và 
              quản lý hiệu quả danh mục tài sản của mình.
            </p>
            <div className="flex items-center">
              <span className="text-sm">Xây dựng với</span>
              <Heart size={16} className="mx-1 text-red-500" />
              <span className="text-sm">bởi Đội phát triển</span>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#dashboard" className="hover:text-white transition-colors">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#assets" className="hover:text-white transition-colors">
                  Danh sách tài sản
                </a>
              </li>
              <li>
                <a href="#maintenance" className="hover:text-white transition-colors">
                  Lịch bảo trì
                </a>
              </li>
              <li>
                <a href="#reports" className="hover:text-white transition-colors">
                  Báo cáo
                </a>
              </li>
              <li>
                <a href="#help" className="hover:text-white transition-colors flex items-center">
                  <HelpCircle size={14} className="mr-1" />
                  Trợ giúp
                </a>
              </li>
              <li>
                <a href="#documentation" className="hover:text-white transition-colors flex items-center">
                  <FileText size={14} className="mr-1" />
                  Tài liệu hướng dẫn
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+84 (0) 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:support@assetmanagement.vn" className="hover:text-white transition-colors">
                  support@assetmanagement.vn
                </a>
              </li>
              <li>
                <form className="mt-4">
                  <label htmlFor="newsletter" className="block mb-2 text-sm">
                    Đăng ký nhận thông báo
                  </label>
                  <div className="flex">
                    <input
                      type="email"
                      id="newsletter"
                      placeholder="Email của bạn"
                      className="text-gray-800 px-3 py-2 text-sm rounded-l-md w-full focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm rounded-r-md focus:outline-none"
                    >
                      Đăng ký
                    </button>
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright bar */}
      <div className="bg-gray-900 py-4">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-2 md:mb-0">
              © {currentYear} Hệ thống Quản lý tài sản. Tất cả các quyền được bảo lưu.
            </div>
            <div className="flex space-x-4">
              <a href="#terms" className="text-sm hover:text-white transition-colors">
                Điều khoản sử dụng
              </a>
              <a href="#privacy" className="text-sm hover:text-white transition-colors">
                Chính sách bảo mật
              </a>
              <a href="https://github.com" className="text-sm hover:text-white transition-colors flex items-center">
                <Github size={16} className="mr-1" />
                Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;