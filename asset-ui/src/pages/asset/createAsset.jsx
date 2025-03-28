import { useState } from "react";
import axios from "axios";
import "./createAsset.css"; 
import { config } from "../../config";

function CreateAsset() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("in use");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const newAsset = { name, status, location, quantity };
    console.log(newAsset);
    
    try {
      const {data} =  await axios.post("http://localhost:5000/manager/asset/create", newAsset,config);
      console.log(data);
      
      setMessage("✅ Tạo tài sản thành công!");
      setName("");
      setStatus("Đang sử dụng");
      setLocation("");
      setQuantity(1);
    } catch (error) {
      setMessage("❌ Lỗi khi tạo tài sản. Vui lòng thử lại!");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Tạo tài sản mới</h2>

      {message && <p className={`message ${message.includes("❌") ? "error" : "success"}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Tên tài sản:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Trạng thái:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="in use">Đang sử dụng</option>
            <option value="maintenance">Bảo trì</option>
            <option value="disposed">Thanh lý</option>
          </select>
        </div>

        <div className="form-group">
          <label>Vị trí:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Số lượng:</label>
          <input type="number" value={quantity} min="1" onChange={(e) => setQuantity(e.target.value)} required />
        </div>

        <button type="submit" className="submit-btn">Tạo mới</button>
      </form>
    </div>
  );
}

export default CreateAsset;
