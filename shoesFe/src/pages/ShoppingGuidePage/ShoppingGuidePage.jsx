import React from 'react'
import { WrapperTitle } from './style'

const ShoppingGuidePage = () => {
  return (
    <div style={{marginBottom: '50px'}}>
    <div style={{ width: '100%', background: '#f5f5fa' }}> 
    <div style={{ width: '1270px', margin: '0 auto', }}>
        <div>
            <div>
                <h1 style={{fontWeight:'600'}}>Quy trình mua hàng tại shop giày FP</h1>
            </div>
            <div>
                <WrapperTitle>Mua hàng tại shop</WrapperTitle>

                <p>Quý khách vui lòng ghé địa chỉ shop tại <span style={{color:'#0073ca',textDecoration:'underline'}}>02 Trường Sa, Quận Bình Thạnh, Thành Phố Hồ Chí Minh </span>   để được nhân viên tư vấn và hướng dẫn thêm</p>
                <WrapperTitle>
                Đặt hàng online
                </WrapperTitle>
                <p><span style={{fontWeight:'700'}}>-Bước 1:</span>Chọn mẫu giày bạn thích trên Webiste</p>
                <p><span style={{fontWeight:'700'}}>-Bước 2:</span>Đặt hàng trên Webiste</p>
                <p><span style={{fontWeight:'700'}}>-Bước 3:</span>Xác nhận đơn hàng nhân viên bán hàng sẽ chủ động liên hệ với quý khách để xác nhận mẫu và size bằng điện thoại, email.</p>
                <p><span style={{fontWeight:'700'}}>-Bước 4:</span>Tiến hành giao hàng Shop gửi giao hàng tiết kiệm để ship cho quý khách.</p>
                <p><span style={{fontWeight:'700'}}>-Bước 5:</span>Thanh toán  quý khách nhận hàng, kiểm tra rồi thanh toán cho bạn giao hàng.</p>
           <p>Mọi thông tin chi tiết xin vui lòng liên hệ:<span style={{fontWeight:'700'}}> 0909.365.079 / 0932.152.259 Hotline & Zalo </span></p>

                

                

            </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default ShoppingGuidePage