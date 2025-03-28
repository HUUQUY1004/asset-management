import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../config";

const MaintainAsset = () => {
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("maintenance"); // Default "Đang bảo trì"
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Mới thêm: Quản lý trạng thái dropdown

    // Fetch assets from the backend
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const status = 'Tất cả';
                const response = await axios.get(`http://localhost:5000/manager/asset/get-all-asset/${status}`, config); // Replace with actual API endpoint
                console.log(response);
                setAssets(response.data);
            } catch (error) {
                console.error("Có lỗi khi tải dữ liệu tài sản", error);
            }
        };

        fetchAssets();
    }, []);

    const handleComplete = async () => {
        if (!selectedAsset) {
            alert("Vui lòng chọn tài sản!");
            return;
        }

        try {
            // Gửi API hoàn tất, truyền vào asset ID, description và status
            const response = await axios.post(`http://localhost:5000/manager/asset/maintenance`, {
                assetId: selectedAsset.id,
                description: description,
                status: status,
            }, config);

            console.log("Bảo trì thành công", response.data);
            alert("Bảo trì thành công!");
        } catch (error) {
            console.error("Có lỗi khi gọi API hoàn tất", error);
            alert("Có lỗi khi gọi API hoàn tất");
        }
    };

    return (
        <div>
            <h2 className="py-3 text-xl text-center font-bold">Bảo trì sản phẩm</h2>

            <div id="hs-combobox-basic-usage" className="relative" data-hs-combo-box="">
                <div className="relative">
                    <input
                        className="py-2.5 sm:py-3 ps-4 pe-9 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        type="text"
                        role="combobox"
                        aria-expanded={isDropdownOpen ? "true" : "false"} // Quản lý trạng thái mở/đóng dropdown
                        value={selectedAsset ? selectedAsset.name : ""}
                        data-hs-combo-box-input=""
                        readOnly
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Mở/đóng dropdown khi nhấn vào input
                    />
                    <div
                        className="absolute top-1/2 end-3 -translate-y-1/2"
                        aria-expanded={isDropdownOpen ? "true" : "false"}
                        role="button"
                        data-hs-combo-box-toggle=""
                    >
                        <svg
                            className="shrink-0 size-3.5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m7 15 5 5 5-5"></path>
                            <path d="m7 9 5-5 5 5"></path>
                        </svg>
                    </div>
                </div>

                {/* ComboBox Dropdown */}
                <div
                    className={`absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto ${isDropdownOpen ? "" : "hidden"}`} // Toggle class hidden
                    role="listbox"
                    data-hs-combo-box-output=""
                >
                    {assets.map((asset) => (
                        <div
                            key={asset.id}
                            className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100"
                            role="option"
                            onClick={() => {
                                setSelectedAsset(asset);
                                setIsDropdownOpen(false); // Đóng dropdown khi chọn một tài sản
                            }}
                        >
                            <div className="flex justify-between items-center w-full">
                                <span data-hs-combo-box-search-text={asset.name} data-hs-combo-box-value="">{asset.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                    className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md"
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                <select
                    className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="maintenance">Đang bảo trì</option>
                    <option value="completed">Đã bảo trì</option>
                </select>
            </div>

            <div className="mt-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={handleComplete}
                >
                    Hoàn tất
                </button>
            </div>
        </div>
    );
};

export default MaintainAsset;
