import React from 'react';

import { Container } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import './Accordion.css'

function Questions () {
  return (
    <Container className='mb-5 rtl'>
      <Accordion defaultActiveKey='0'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>کارت کد تخفیف یا گیفت چیه؟</Accordion.Header>
          <Accordion.Body>
            شما وینا گایز که همیشه همراهمون هستین بعد از اولین خریدتون همراه با
            پکیج بسته بندی وینا ، کارتی براتون میاد که داخلش کد تخفیف داره و
            همیشه دیگه میتونین سفارش های بعدیتون رو با تخفیف اختصاصی ثبت کنین
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>
            سفارش ها چه زمانی تحویل به پست داده میشن؟
          </Accordion.Header>
          <Accordion.Body>
            سفارش هاتون در بازه زمانی یک الی دو روز کاری تحویل به پست داده میشن.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey='2'>
          <Accordion.Header>کد های رهگیری کجا قرار میگیره؟</Accordion.Header>
          <Accordion.Body>
            کد های رهگیریتون بعد از هر ارسال که اداره پست کد هارو برای ما بفرسته
            داخل پیج دوم یعنی vina__accessory قرار میگیره. هایلایت و استوری میشه{' '}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='3'>
          <Accordion.Header>چقدر طول میکشه بسته به دستم برسه؟</Accordion.Header>
          <Accordion.Body>
          ارسال با پست پیشتاز هست، حدود 3 الی 4 روز زمان میبره.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='4'>
          <Accordion.Header>آیا بدون ایمیل هم میتوانیم خرید کنیم؟</Accordion.Header>
          <Accordion.Body>
          بله. شما میتوانید موقع خرید بجای آدرس ایمیل، آدرس ( test@test.com ) وارد کنید و خرید خود را انجام دهید.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  )
}

export default Questions
