import { useState, useEffect } from "react";
import axios from "axios";

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
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Danh sách tài sản</h2>

      {/* Dropdown lọc theo trạng thái */}
      <div>
        <label>Lọc theo trạng thái: </label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="in use">Đang sử dụng</option>
          <option value="maintenance">Bảo trì</option>
          <option value="disposed">Thanh lý</option>
        </select>
      </div>

      {/* Hiển thị lỗi nếu có */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Hiển thị danh sách tài sản */}
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table border="1" style={{ width: "100%", marginTop: "10px", textAlign: "left" }}>
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
                <td colSpan="4" style={{ textAlign: "center" }}>Không có tài sản nào</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ShowAsset;
