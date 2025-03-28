import { useState, useEffect } from "react";
import axios from "axios";
import "./createMaintenance.css"; 

function CreateMaintenanceSchedule() {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load danh sách tài sản từ backend
    axios.get("http://localhost:5000/api/maintenance/assets")
      .then(response => setAssets(response.data))
      .catch(error => console.error("Lỗi khi tải danh sách tài sản:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const newSchedule = { assetId: selectedAsset, frequency };
    
    try {
      const { data } = await axios.post("http://localhost:5000/api/maintenance/create", newSchedule);
      console.log(data);
      setMessage("✅ Tạo lịch bảo trì thành công!");
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
    </div>
  );
}

export default CreateMaintenanceSchedule;
