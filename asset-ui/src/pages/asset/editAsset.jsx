import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const EditAsset = () => {
    const {id} = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const [hoverSave, setHoverSave] = useState(false);
    const [hoverCancel, setHoverCancel] = useState(false);

    const [asset, setAsset] = useState({
        name: "",
        status: "",
        location: "",
        quantity: 0,
    });

    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState("");

    // Tải dữ liệu tài sản từ API
    // useEffect(() => {
    //     axios.get(`/manager/asset/${id}`)
    //         .then(response => {
    //             setAsset(response.data);
    //             setLoading(false);
    //         })
    //         .catch(() => {
    //             setError("Không tìm thấy tài sản");
    //             setLoading(false);
    //         });
    // }, [id]);

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const {name, value} = e.target;
        setAsset({...asset, [name]: value});
    };

    // Xử lý cập nhật tài sản
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/manager/asset/${id}`, asset)
            .then(() => {
                alert("Cập nhật thành công!");
                navigate("/assets"); // Quay lại danh sách tài sản
            })
            .catch(() => {
                alert("Lỗi khi cập nhật tài sản");
            });
    };

    // if (loading) return <p>Đang tải...</p>;
    // if (error) return <p>{error}</p>;

    return (
        <div style={{
            maxWidth: "500px",
            margin: "20px auto",
            padding: "20px",
            background: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
        }}>
            <h2 style={{textAlign: "center", color: "#333", fontSize: "30px", fontWeight: "bold",}}>Chỉnh sửa tài sản</h2>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
                <div style={{marginBottom: "15px"}}>
                    <label style={{fontWeight: "bold", display: "block", marginBottom: "5px"}}>Tên tài sản:</label>
                    <input
                        type="text"
                        name="name"
                        value={asset.name}
                        onChange={handleChange}
                        required
                        style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px"}}
                    />
                </div>

                <div style={{marginBottom: "15px"}}>
                    <label style={{fontWeight: "bold", display: "block", marginBottom: "5px"}}>Trạng thái:</label>
                    <select
                        name="status"
                        value={asset.status}
                        onChange={handleChange}
                        style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px"}}
                    >
                        <option value="available">Có sẵn</option>
                        <option value="in use">Đang sử dụng</option>
                        <option value="damaged">Hỏng</option>
                    </select>
                </div>

                <div style={{marginBottom: "15px"}}>
                    <label style={{fontWeight: "bold", display: "block", marginBottom: "5px"}}>Vị trí:</label>
                    <input
                        type="text"
                        name="location"
                        value={asset.location}
                        onChange={handleChange}
                        required
                        style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px"}}
                    />
                </div>

                <div style={{marginBottom: "15px"}}>
                    <label style={{fontWeight: "bold", display: "block", marginBottom: "5px"}}>Số lượng:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={asset.quantity}
                        onChange={handleChange}
                        required
                        style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px"}}
                    />
                </div>

                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: hoverSave ? "#2c422e" : "#25c63a",
                            color: "white",
                            padding: "10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            transition: "0.3s",
                        }}
                        onMouseEnter={() => setHoverSave(true)}
                        onMouseLeave={() => setHoverSave(false)}
                    >
                        Lưu thay đổi
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/assets")}
                        style={{
                            backgroundColor: hoverCancel ? "#532429" : "#dc3545", // Màu đậm hơn khi hover
                            color: "white",
                            padding: "10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            transition: "0.3s",
                        }}
                        onMouseEnter={() => setHoverCancel(true)}
                        onMouseLeave={() => setHoverCancel(false)}
                    >
                        Hủy
                    </button>

                </div>
            </form>
        </div>
    );
};

export default EditAsset;
