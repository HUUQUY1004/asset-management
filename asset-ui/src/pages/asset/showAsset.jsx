import { useState, useEffect } from "react";
import axios from "axios";
import "./showAsset.css";


const ShowAsset = () => {
    const [assets, setAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");

    useEffect(() => {
      fetch("http://localhost:5000/manager/asset/list")

        // fetch("http://localhost:8080/manager/asset/list")
            .then(response => response.json())
            .then(data => {
                setAssets(data);
                setFilteredAssets(data);
            })
            .catch(error => console.error("Lỗi khi lấy danh sách tài sản:", error));
    }, []);

    // Xử lý lọc theo trạng thái
    const filterMap = {
      "Đang sử dụng": "in_use",
      "Bảo trì": "maintenance",
      "Có sẵn": "available"
  };
  
  const handleFilterChange = (status) => {
      setFilterStatus(status);
      if (status === "") {
          setFilteredAssets(assets);
      } else {
          setFilteredAssets(assets.filter(asset => asset.status === filterMap[status]));
      }
  };
  

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Danh Sách Tài Sản</h2>

            {/* Bộ lọc trạng thái */}
            <div className="mb-4">
                <label className="mr-2">Lọc theo trạng thái:</label>
                <select
                    value={filterStatus}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="p-2 border rounded-lg"
                >
                    <option value="">Tất cả</option>
                    <option value="Đang sử dụng">Đang sử dụng</option>
                    <option value="Bảo trì">Bảo trì</option>
                    <option value="Có sẵn">Có sẵn</option>
                </select>
            </div>

            {/* Bảng hiển thị tài sản */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Tên</th>
                        <th className="border p-2">Vị trí</th>
                        <th className="border p-2">Trạng thái</th>
                        <th className="border p-2">Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAssets.length > 0 ? (
                        filteredAssets.map((asset) => (
                            <tr key={asset.id} className="text-center">
                                <td className="border p-2">{asset.name}</td>
                                <td className="border p-2">{asset.location}</td>
                                <td className="border p-2">{asset.status}</td>
                                <td className="border p-2">{asset.quantity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="border p-2 text-center text-gray-500">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ShowAsset;
