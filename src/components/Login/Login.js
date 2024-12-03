import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './Login.css';

const Login = ({ handleLogin }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(''); 
  const navigate = useNavigate();

  const saveUserIdToLocalStorage = (userId) => {
    console.log('login - Saving userId to localStorage:', userId);
    localStorage.setItem('userId', userId);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jwl-users-default-rtdb.firebaseio.com/users.json');
      console.log('login - Response received with status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      console.log('login - Fetched users:', data);
      return data;
    } catch (error) {
      console.error('login - Error fetching users:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const users = await fetchUsers();

      if (users) {
        const userArray = Object.entries(users);
        console.log('login - User array:', userArray);

        const userEntry = userArray.find(
          ([, user]) => user.email === email && user.password === password
        );

        if (userEntry) {
          const extractedUserId = userEntry[0];
          console.log('login - Extracted userId:', extractedUserId);

          setUserId(extractedUserId); // ست کردن userId در state از ایندکس صفرم آرایه

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('currentUser', JSON.stringify(userEntry[1]));
          saveUserIdToLocalStorage(extractedUserId);

          handleLogin(userEntry[1], extractedUserId); // ارسال user و userId به handleLogin
          navigate('/');
        } else {
          setError('نام کاربری یا رمز عبور اشتباه است.');
        }
      } else {
        setError('کاربری یافت نشد.');
      }
    } catch (error) {
      console.error('خطا در هنگام احراز هویت:', error);
      setError('خطایی در سیستم رخ داده است. لطفا دوباره تلاش کنید.');
    }
  };

  useEffect(() => {
    if (userId) {
      saveUserIdToLocalStorage(userId);
      console.log('login - User ID after storing in useEffect:', userId);
    }
  }, [userId]);

  return (
    <Layout>
      <Container fluid className='d-flex justify-content-center align-items-center'>
        <Row>
          <Col md={12} className='mt-5'>
            <div className='p-5 shadow-sm rounded bg-white'>
              <h5 className='text-center mb-4'>ورود یا ثبت‌نام</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>ایمیل</Form.Label>
                  <Form.Control
                    className='custom-placeholder'
                    type='text'
                    placeholder='ایمیل'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicPassword' className='mt-3'>
                  <Form.Label>رمز عبور</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='رمز عبور'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant='success' type='submit' className='w-100 mt-3'>
                  ورود
                </Button>
              </Form>
              {error && (
                <Alert variant='danger' className='mt-3'>
                  {error}
                </Alert>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Login;
