// src/services/userService.js

import apiFetch from './apiService';

/**
 * الحصول على قائمة المستخدمين.
 * @returns {Promise<Array>} قائمة المستخدمين.
 */
export const getUsers = async () => {
    return apiFetch('/api/users');
};

/**
 * الحصول على تفاصيل مستخدم محدد.
 * @param {string} userId - معرّف المستخدم.
 * @returns {Promise<Object>} تفاصيل المستخدم.
 */
export const getUserById = async (userId) => {
    return apiFetch(`/api/users/${userId}`);
};

/**
 * إضافة مستخدم جديد.
 * @param {Object} userData - بيانات المستخدم الجديد.
 * @returns {Promise<Object>} تفاصيل المستخدم الجديد.
 */
export const createUser = async (userData) => {
    return apiFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};

/**
 * تحديث تفاصيل مستخدم.
 * @param {string} userId - معرّف المستخدم.
 * @param {Object} userData - بيانات التحديث.
 * @returns {Promise<Object>} تفاصيل المستخدم بعد التحديث.
 */
export const updateUser = async (userId, userData) => {
    return apiFetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
    });
};

/**
 * حذف مستخدم.
 * @param {string} userId - معرّف المستخدم.
 * @returns {Promise<void>} لا يوجد استجابة.
 */
export const deleteUser = async (userId) => {
    return apiFetch(`/api/users/${userId}`, {
        method: 'DELETE',
    });
};
