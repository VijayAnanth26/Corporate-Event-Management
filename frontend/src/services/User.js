import instance from "./Axios";

// User endpoints
export const getAllUsers = () => instance.get(`/api/v1/user/all`);
export const getUserById = (id) => instance.get(`/api/v1/user/${id}`);
export const updateUser = (id, data) => instance.put(`/api/v1/user/update/${id}`, data);
export const deleteUser = (id) => instance.delete(`/api/v1/user/delete/${id}`);
export const changePassword = (data) => instance.post(`/api/v1/user/change-password`, data);

// Event endpoints
export const getAllEvents = () => instance.get(`/api/v1/event/all`);
export const getFeaturedEvents = () => instance.get(`/api/v1/event/all`);
export const getEventById = (id) => instance.get(`/api/v1/event/${id}`);
export const createEvent = (data) => instance.post(`/api/v1/event/add`, data);
export const updateEvent = (id, data) => instance.put(`/api/v1/event/update/${id}`, data);
export const deleteEvent = (id) => instance.delete(`/api/v1/event/delete/${id}`);

// Booking endpoints
export const getAllBookings = () => instance.get(`/api/v1/booking/all`);
export const getUserBookings = (userId) => instance.get(`/api/v1/booking/user/${userId}`);
export const getBookingById = (id) => instance.get(`/api/v1/booking/${id}`);
export const createBooking = (data) => instance.post(`/api/v1/booking/add`, data);
export const updateBooking = (id, data) => instance.put(`/api/v1/booking/update/${id}`, data);
export const deleteBooking = (id) => instance.delete(`/api/v1/booking/delete/${id}`);

// Payment endpoints
export const getAllPayments = () => instance.get(`/api/v1/payment/all`);
export const getUserPayments = (userId) => instance.get(`/api/v1/payment/user/${userId}`);
export const getPaymentById = (id) => instance.get(`/api/v1/payment/${id}`);
export const createPayment = (data) => instance.post(`/api/v1/payment/add`, data);
export const updatePayment = (id, data) => instance.put(`/api/v1/payment/update/${id}`, data);
export const deletePayment = (id) => instance.delete(`/api/v1/payment/delete/${id}`);