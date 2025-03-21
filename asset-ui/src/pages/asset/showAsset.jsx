import { useState, useEffect } from "react";
import axios from "axios";
import "./showAsset.css";

function ShowAsset() {
  const [assets, setAssets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAssets();
  }, [statusFilter]);

  const fetchAssets = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:8080/api/assets", {
        params: { status: statusFilter !== "all" ? statusFilter : undefined },
      });
      setAssets(response.data);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Danh sách tài sản</h2>

      {/* Dropdown lọc theo trạng thái */}
      <div className="filter-container">
        <label className="filter-label">Lọc theo trạng thái: </label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
          <option value="all">Tất cả</option>
          <option value="in use">Đang sử dụng</option>
          <option value="maintenance">Bảo trì</option>
          <option value="disposed">Thanh lý</option>
        </select>
      </div>

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
              <th>Trạng thái</th>
              <th>Vị trí</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {assets.length > 0 ? (
              assets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.name}</td>
                  <td>{asset.status}</td>
                  <td>{asset.location}</td>
                  <td>{asset.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-asset">Không có tài sản nào</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ShowAsset;
