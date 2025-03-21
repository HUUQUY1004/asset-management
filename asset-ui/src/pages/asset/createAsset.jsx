import { useState } from "react";
import axios from "axios";

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

    try {
      const response = await axios.post("http://localhost:8080/api/assets", newAsset);
      setMessage("Tạo tài sản thành công!");
      setName("");
      setStatus("in use");
      setLocation("");
      setQuantity(1);
    } catch (error) {
      setMessage("Lỗi khi tạo tài sản. Vui lòng thử lại!");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Tạo tài sản mới</h2>
      {message && <p style={{ color: message.includes("Lỗi") ? "red" : "green" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên tài sản:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label>Trạng thái:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="in use">Đang sử dụng</option>
            <option value="maintenance">Bảo trì</option>
            <option value="disposed">Thanh lý</option>
          </select>
        </div>

        <div>
          <label>Vị trí:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>

        <div>
          <label>Số lượng:</label>
          <input type="number" value={quantity} min="1" onChange={(e) => setQuantity(e.target.value)} required />
        </div>

        <button type="submit">Tạo mới</button>
      </form>
    </div>
  );
}

export default CreateAsset;
