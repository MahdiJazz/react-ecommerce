import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false); // کنترل نمایش فرم تغییر رمز عبور
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('شناسه کاربر یافت نشد.');
          navigate('/login');
          return;
        }

        const response = await fetch(`https://jwl-users-default-rtdb.firebaseio.com/users/${userId}.json`);
        if (!response.ok) {
          throw new Error('خطا در واکشی اطلاعات کاربر');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError('خطا در واکشی اطلاعات.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('شناسه کاربر یافت نشد.');
        return;
      }

      const response = await fetch(`https://jwl-users-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('خطا در به‌روزرسانی اطلاعات.');
      }

      setSuccessMessage('اطلاعات با موفقیت به‌روزرسانی شد.');
    } catch (error) {
      setError('خطا در به‌روزرسانی اطلاعات.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`https://jwl-users-default-rtdb.firebaseio.com/users/${userId}.json`);
      const userData = await response.json();
  
      if (userData.password !== currentPassword) {
        setError('رمز عبور فعلی اشتباه است.');
        return;
      }
  
      if (newPassword !== confirmNewPassword) {
        setError('رمز عبور جدید و تکرار آن یکسان نیستند.');
        return;
      }
  
      const updateResponse = await fetch(`https://jwl-users-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, password: newPassword }),
      });
  
      if (!updateResponse.ok) {
        throw new Error('خطا در به‌روزرسانی رمز عبور.');
      }
  
      setSuccessMessage('رمز عبور با موفقیت تغییر یافت.');
  
      // به‌روزرسانی state اصلی با رمز عبور جدید
      setUserData((prevData) => ({
        ...prevData,
        password: newPassword,
      }));
  
      setShowChangePasswordForm(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setError(null);
    } catch (error) {
      setError('خطا در تغییر رمز عبور.');
    }
  };
  
  

  if (loading) {
    return (
      <Layout>
        <Container className="mt-5 text-center">
          <p>در حال بارگذاری...</p>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="mt-5">
        <h2 className="mb-4 text-center">حساب کاربری</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form onSubmit={handleUpdateProfile}>
          <Form.Group controlId="formEmail">
            <Form.Label>ایمیل</Form.Label>
            <Form.Control
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100 mt-3">
            ذخیره تغییرات
          </Button>
        </Form>
        <Button
          variant="outline-primary"
          className="w-100 mt-3"
          onClick={() => setShowChangePasswordForm(!showChangePasswordForm)}
        >
          {showChangePasswordForm ? 'لغو تغییر رمز عبور' : 'تغییر رمز عبور'}
        </Button>
        {showChangePasswordForm && (
          <Form onSubmit={handleChangePassword} className="mt-4">
            <Form.Group controlId="currentPassword">
              <Form.Label>رمز عبور فعلی</Form.Label>
              <Form.Control
                type="password"
                placeholder="رمز عبور فعلی"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newPassword" className="mt-3">
              <Form.Label>رمز عبور جدید</Form.Label>
              <Form.Control
                type="password"
                placeholder="رمز عبور جدید"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmNewPassword" className="mt-3">
              <Form.Label>تکرار رمز عبور جدید</Form.Label>
              <Form.Control
                type="password"
                placeholder="تکرار رمز عبور جدید"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-4">
              ذخیره رمز عبور جدید
            </Button>
          </Form>
        )}
      </Container>
    </Layout>
  );
};

export default Profile;
