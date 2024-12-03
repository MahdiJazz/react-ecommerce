import React from 'react'
import Layout from '../Layout/Layout'
import { Container, Row, Col } from 'react-bootstrap'
import TitleWithLines from '../TitleWithLines/TitleWithLines'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './Contact.css'

export default function Contact () {
  return (
    <Layout>
      <TitleWithLines text='تماس با ما' />
      <Container>
        <Row className='d-flex justify-content-between mb-5'>
          <Col>
            <p style={{marginBottom:'100px'}}>
              اگر در هر مرحله‌ای از خرید و یا انتخاب محصول نیاز به راهنمایی
              دارید، تیم پشتیبانی ما آماده پاسخگویی به سوالات شماست. هدف ما
              فراهم کردن تجربه‌ای مطمئن و راحت برای شماست تا با خیالی آسوده از
              خرید خود لذت ببرید. لطفاً از طریق فرم زیر با ما در ارتباط باشید.
            </p>
            <Form>
            <Row className='mb-3'>
              <Col>
                <Form.Control placeholder='نام و نام خانوادگی' dir='rtl' />
              </Col>
              <Col>
                <Form.Control
                  type='tel'
                  placeholder='شماره موبایل'
                  dir='rtl'
                  className='text-right-placeholder'
                  onKeyDown={e => {
                    if (!/[0-9+]/.test(e.key)) {
                      e.preventDefault()
                    }
                  }}
                />
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col>
                <Form.Control
                  as='textarea'
                  placeholder='پیام شما'
                  rows={3}
                  dir='rtl'
                />
              </Col>
            </Row>
            <Button variant='primary' type='submit'>
              ارسال پیام
            </Button>
          </Form>
          </Col>

          <Col>
            <img
              src='/images/contact/contact.png'
              alt=''
              className='img-fluid full-width-img'
            />
          </Col>
        </Row>
        <Row>
         
        </Row>
      </Container>
    </Layout>
  )
}
