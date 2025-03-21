import { useState } from "react";
import axios from "axios";

const CreateAsset = () => {
  const [asset, setAsset] = useState({
    name: "",
    status: "available",
    location: "",
    quantity: 1,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset({ ...asset, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/assets/create", asset);
      setMessage(`Tài sản ${response.data.name} đã được tạo thành công!`);
      setAsset({ name: "", status: "available", location: "", quantity: 1 });
    } catch (error) {
      setMessage("Lỗi khi tạo tài sản. Vui lòng thử lại!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h2>Tạo mới tài sản</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Tên tài sản:
          <input type="text" name="name" value={asset.name} onChange={handleChange} required />
        </label>

        <label>
          Trạng thái:
          <select name="status" value={asset.status} onChange={handleChange}>
            <option value="available">Có sẵn</option>
            <option value="in use">Đang sử dụng</option>
            <option value="maintenance">Bảo trì</option>
            <option value="disposed">Thanh lý</option>
          </select>
        </label>

        <label>
          Vị trí:
          <input type="text" name="location" value={asset.location} onChange={handleChange} required />
        </label>

        <label>
          Số lượng:
          <input type="number" name="quantity" value={asset.quantity} onChange={handleChange} min="1" required />
        </label>

        <button type="submit">Tạo tài sản</button>
      </form>
    </div>
  );
};

export default CreateAsset;
