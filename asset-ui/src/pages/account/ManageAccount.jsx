import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageAccount = () => {
    const [users, setUsers] = useState([]);
    const [authToken, setAuthToken] = useState("eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0IiwiaWF0IjoxNzQzMDgxMTE2LCJleHAiOjE3NDMxNjc1MTYsImF1dGhvcml0aWVzIjpbImFkbWluIl19.FNv0xHlz_Q-d0DMXlmib4CMgL7sEL43-a5e_Tda0y3-9SE50geZUHH24zidih0zm");

    useEffect(() => {
        // Lấy thông tin người dùng từ API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user-accounts/getAllUserStatus', {
                    headers: {
                        Authorization: `${authToken}`,
                    },
                });
                setUsers(response.data);
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

            const response = await axios.post(url, {}, {
                headers: {
                    Authorization: `${authToken}`,
                },
            });

            // Cập nhật lại dữ liệu người dùng sau khi thực hiện hành động
            const updatedUsers = users.map(user =>
                user.id === id ? { ...user, enabled: action === 'unlock' } : user
            );
            setUsers(updatedUsers);
        } catch (error) {
            console.error("Có lỗi khi thực hiện hành động khóa/mở khóa", error);
        }
    };

    return (
        <div>
            <h2>Danh sách người dùng</h2>
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>{user.enabled ? 'Đang hoạt động' : 'Đã khóa'}</td>
                        <td>
                            <button
                                onClick={() => handleLockUnlock(user.id, user.enabled ? 'lock' : 'unlock')}
                            >
                                {user.enabled ? 'Khóa' : 'Mở khóa'}
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
