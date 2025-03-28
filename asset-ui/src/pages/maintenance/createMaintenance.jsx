import { useState, useEffect } from "react";
import axios from "axios";
import "./createMaintenance.css"; 
import { config } from "../../config";

function CreateMaintenanceSchedule() {
  const [assets, setAssets] = useState([]);
  const [maintenanceSchedules, setMaintenanceSchedules] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load danh sách tài sản
    axios.get("http://localhost:5000/manager/asset/get-all-asset/Tất cả", config)
      .then(response => setAssets(response.data))
      .catch(error => console.error("Lỗi khi tải danh sách tài sản:", error));

    // Load danh sách lịch bảo trì
    axios.get("http://localhost:5000/api/maintenance/all")
      .then(response => setMaintenanceSchedules(response.data))
      .catch(error => console.error("Lỗi khi tải danh sách bảo trì:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const newSchedule = { assetId: selectedAsset, frequency };
    
    try {
      const { data } = await axios.post("http://localhost:5000/manager/maintenance/create", newSchedule,config);
      setMessage("✅ Tạo lịch bảo trì thành công!");

      // Cập nhật danh sách bảo trì sau khi thêm mới
      setMaintenanceSchedules([...maintenanceSchedules, data]);
      setSelectedAsset("");
      setFrequency("daily");
    } catch (error) {
      setMessage("❌ Lỗi khi tạo lịch bảo trì. Vui lòng thử lại!");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Tạo Lịch Bảo Trì</h2>

      {message && <p className={`message ${message.includes("❌") ? "error" : "success"}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Chọn Tài Sản:</label>
          <select value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)} required>
            <option value="">-- Chọn tài sản --</option>
            {assets.map(asset => (
              <option key={asset.id} value={asset.id}>{asset.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tần Suất Bảo Trì:</label>
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)} required>
            <option value="daily">Hàng ngày</option>
            <option value="weekly">Hàng tuần</option>
            <option value="monthly">Hàng tháng</option>
            <option value="quarterly">3 tháng 1 lần</option>
            <option value="semi-annually">6 tháng 1 lần</option>
            <option value="every-9-months">9 tháng 1 lần</option>
            <option value="annually">1 năm 1 lần</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Tạo Lịch</button>
      </form>

      {/* Hiển thị danh sách bảo trì */}
      <h2 className="title">Danh Sách Bảo Trì</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Tài Sản</th>
            <th>Tần Suất</th>
            <th>Ngày Bảo Trì Tiếp Theo</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceSchedules.map(schedule => (
            <tr key={schedule.id}>
              <td>{schedule.assetName}</td>
              <td>{schedule.frequency}</td>
              <td>{new Date(schedule.nextMaintenanceDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CreateMaintenanceSchedule;
