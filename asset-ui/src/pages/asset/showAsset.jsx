import { useState, useEffect } from "react";
import axios from "axios";
import "./showAsset.css";
import { config } from "../../config";
import { useAsset } from "../../store/useAsset";
import { useNavigate } from "react-router-dom";

function ShowAsset() {
  const [assets, setAssets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {asset, setAsset} = useAsset()

  const navigate = useNavigate()
  useEffect(() => {
    fetchAssets();
  }, [statusFilter]);

  const fetchAssets = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:5000/manager/asset/get-all-asset/${statusFilter}`, config);
      setAssets(response.data);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };
  const handleClick = (asset)=>{
    setAsset(asset)
    navigate(`/edit-asset`)
    
    // navigate(`/assets/${asset.id}`)
    
  }
  const removeAsset = async (assetId) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.delete(`http://localhost:5000/manager/asset/delete/${assetId}`, config);
      fetchAssets()
    } catch (err) {
      console.log(err)
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
          <option value="Tất cả">Tất cả</option>
          <option value="Đang sử dụng">Đang sử dụng</option>
          <option value="Bảo trì">Bảo trì</option>
          <option value="Thanh lý">Thanh lý</option>
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
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {assets.length > 0 ? (
              assets?.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.name}</td>
                  <td>{asset.status}</td>
                  <td>{asset.location}</td>
                  <td>{asset.quantity}</td>
                  <td className="flex gap-4">
                    <button onClick={()=>handleClick(asset)} className="edit-button bg-green-500 px-4 py-2 rounded-md">Sửa</button>
                    <button onClick={() => {
                      removeAsset(asset.id);
                    }} className="delete-button bg-red-500 px-4 py-2 rounded-md">Xóa</button>
                  </td>
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
