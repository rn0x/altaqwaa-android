// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { getItem } from '../utils/localStorageUtils.js';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/HomePage.module.css'; // استيراد ملف CSS module

export default function HomePage() {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem('token');
    if (token) {
      setIsTokenValid(true);
    } else {
      navigate('/'); // الانتقال إلى صفحة إدخال التوكن إذا لم يكن التوكن موجود
    }
  }, [navigate]);

  if (!isTokenValid) {
    return null; // عرض لا شيء بينما يتم التحقق من التوكن
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>HomePage</div>
    </div>
  );
}
