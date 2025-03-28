export const token = localStorage.getItem("access_token");

// if (token) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }
export const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
