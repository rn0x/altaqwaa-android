// src/services/authService.js

import apiFetch from './apiService';

/**
 * تسجيل الدخول.
 * @param {Object} credentials - بيانات تسجيل الدخول.
 * @returns {Promise<Object>} معلومات المستخدم بعد تسجيل الدخول.
 */
export const login = async (credentials) => {
    return apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
};

/**
 * تسجيل خروج المستخدم.
 * @returns {Promise<void>} لا يوجد استجابة.
 */
export const logout = async () => {
    return apiFetch('/api/auth/logout', {
        method: 'POST',
    });
};
