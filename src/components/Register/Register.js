import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const RegisterModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // بررسی اینکه رمز عبور و تکرار رمز عبور برابر هستند یا خیر
    if (password !== confirmPassword) {
      setErrorMessage('رمز عبور و تکرار رمز عبور برابر نیستند.');
      return;
    }

    try {
      // ارسال داده‌های کاربر جدید به Realtime Database با استفاده از fetch
      const response = await fetch('https://jwl-users-default-rtdb.firebaseio.com/users.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const userId = data.name; // Firebase به صورت پیش‌فرض شناسه جدید را به صورت `name` برمی‌گرداند

        console.log('کاربر با موفقیت اضافه شد', userId);

        // ذخیره `userId` و اطلاعات کاربر در `localStorage`
        localStorage.setItem('userId', userId);
        localStorage.setItem('currentUser', JSON.stringify({ email, password }));

        setErrorMessage('');
        setSuccessMessage('ثبت‌نام با موفقیت انجام شد! لطفاً وارد شوید.');

        // هدایت به صفحه ورود پس از چند لحظه
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        throw new Error('خطا در هنگام ثبت‌نام');
      }
    } catch (error) {
      setErrorMessage('خطا در هنگام ثبت‌نام: ' + error.message);
    }
  };

  return (
    <Layout>
      <Container fluid className="d-flex justify-content-center align-items-center">
        <Row>
          <Col md={12} className='mt-5'>
            <div className="p-5 shadow-sm rounded bg-white">
              <h5 className="text-center mb-4">ثبت‌نام</h5>
              {successMessage && (
                <div className="alert alert-success mt-3">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="alert alert-danger mt-3">{errorMessage}</div>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>ایمیل خود را وارد کنید</Form.Label>
                  <Form.Control
                    className='custom-placeholder'
                    type='text'
                    placeholder='ایمیل'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicPassword' className='mt-3'>
                  <Form.Label>رمز عبور</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='رمز عبور'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='formConfirmPassword' className='mt-3'>
                  <Form.Label>تکرار رمز عبور</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='تکرار رمز عبور'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="success" type="submit" className="w-100 mt-3">
                  ثبت‌نام
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default RegisterModal;
