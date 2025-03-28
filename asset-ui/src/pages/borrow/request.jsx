import { useState, useEffect } from "react";
import axios from "axios";
import "../asset/showAsset.css";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";

function BorrowRequest() {
  const [assets, setAssets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Gọi API khi thay đổi trạng thái
  useEffect(() => {
    fetchAssets();
  }, [statusFilter]);

  // Lấy danh sách tài sản
  const fetchAssets = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:5000/manager/asset/get-all-asset/${statusFilter}`,
        config
      );
      setAssets(response.data);
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      setError("Lỗi khi tải dữ liệu. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý chuyển hướng khi người dùng muốn mượn tài sản
  const handleClick = async(asset) => {
    console.log(asset);
    
    const {data} = await axios.get(`http://localhost:5000/manager/borrow-asset/${asset}`, config)
    console.log(data);
    
  };

  return (
    <div className="container">
      <h2 className="title">Danh sách tài sản</h2>

      {/* Hiển thị lỗi nếu có */}
      {error && <p className="error-message">{error}</p>}

      {/* Hiển thị danh sách tài sản */}
      {loading ? (
        <p className="loading-message">Đang tải...</p>
      ) : (
        <table className="asset-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Vị trí</th>
              <th>Số lượng còn lại</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {assets.length > 0 ? (
              assets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.name}</td>
                  <td>{asset.location}</td>
                  <td>{asset.quantity}</td>
                  <td className="flex gap-4">
                    <button
                      onClick={() => handleClick(asset.id)}
                      className="edit-button bg-green-500 px-4 py-2 rounded-md"
                    >
                      Mượn
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-asset">
                  Không có tài sản nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BorrowRequest;
