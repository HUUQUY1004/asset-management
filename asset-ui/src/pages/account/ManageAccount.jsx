import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { config } from "../../config";

const ManageAccount = () => {
    const [users, setUsers] = useState([]);
    const [authToken, setAuthToken] = useState("eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0IiwiaWF0IjoxNzQzMDgxMTE2LCJleHAiOjE3NDMxNjc1MTYsImF1dGhvcml0aWVzIjpbImFkbWluIl19.FNv0xHlz_Q-d0DMXlmib4CMgL7sEL43-a5e_Tda0y3-9SE50geZUHH24zidih0zm");

    useEffect(() => {
        // Lấy thông tin người dùng từ API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user-accounts/getAllUserStatus', config);
                // Lọc chỉ lấy người dùng có role là "user"
                const filteredUsers = response.data.filter(user => user.role === 'user');
                setUsers(filteredUsers);
            } catch (error) {
                console.error("Có lỗi khi tải dữ liệu người dùng", error);
            }
        };

        fetchUsers();
    }, [authToken]);

    const handleLockUnlock = async (id, action) => {
        try {
            const url = action === 'lock'
                ? `http://localhost:5000/user-accounts/${id}/lock`
                : `http://localhost:5000/user-accounts/${id}/unlock`;

            const response = await axios.put(url, {}, config);

            // Cập nhật lại dữ liệu người dùng sau khi thực hiện hành động
            const updatedUsers = users.map(user =>
                user.id === id ? { ...user, status: action === 'unlock' ? 'active' : 'lock' } : user
            );
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Có lỗi khi thực hiện hành động khóa/mở khóa", error);
        }
    };

    return (
        <div>
            <h2 className="py-3">Danh sách người dùng</h2>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                <tr>
                    <th className="p-3 border border-gray-200">Username</th>
                    <th className="p-3 border border-gray-200">Role</th>
                    <th className="p-3 border border-gray-200">Status</th>
                    <th className="p-3 border border-gray-200">Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td className="p-3 border border-gray-200">{user.username}</td>
                        <td className="p-3 border border-gray-200">{user.role}</td>
                        <td className="p-3 border border-gray-200">{user.status === 'active' ? 'Đang hoạt động' : 'Đã khóa'}</td>
                        <td className="p-3 border border-gray-200">
                            <button
                                className={`border-solid border-2 rounded-md p-2 w-24 ${user.status === 'active' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                                onClick={() => handleLockUnlock(user.id, user.status === 'active' ? 'lock' : 'unlock')}
                            >
                                {user.status === 'active' ? 'Khóa' : 'Mở khóa'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageAccount;
