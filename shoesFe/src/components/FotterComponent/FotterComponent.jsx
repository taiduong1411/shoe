import { Col, Row } from "antd";
import React from "react";
import { WrapperFooterButton, WrapperFooterabout, WrapperFotter, WrapperFotterForm, WrapperFotterInput, WrapperFotterInputGroup, WrapperFotterul } from "./style";
import Link from "antd/es/typography/Link";
import { NavLink, Navigate } from "react-router-dom";
const FotterComponent = () => {



//    const navigate = Navigate();


//  const handleAboutUs = () => {
//     navigate('/about-us')
//  }



    return (
        <WrapperFotter>
            <div>
                <Row justify="center">
                    <Col span={4}>
                        <WrapperFooterabout>
                            <h3>THÔNG TIN LIÊN HỆ</h3>
                            <WrapperFotterul>
                                <li>
                                    <i style={{ marginRight: '10px' }} className="fa-solid fa-location-dot"></i>
                                    Địa chỉ : 02 Trường Sa,Quận Bình Thạnh, Thành Phố Hồ Chí Minh</li>
                                <li>
                                    <i style={{ marginRight: '10px' }} className="fa-solid fa-phone"></i>
                                    Phone:0353955259
                                </li>
                                <li>
                                    <i style={{ marginRight: '10px' }} className="fa-solid fa-envelope"></i>
                                    Email:ShopFP@gmail.com</li>
                            </WrapperFotterul>
                        </WrapperFooterabout>
                    </Col>
                    <Col span={4}>
                        <WrapperFooterabout >
                            <h3>GIỚI THIỆU</h3>
                            <WrapperFotterul>
                                <li>
                                    <NavLink to="/about-us" style={{ color: "#f1f1f1", fontSize: '16px' }} >Về chúng tôi</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/Shopping-Guide" style={{ color: "#f1f1f1", fontSize: '16px' }}>Hướng dẫn mua hàng</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/Delivery-Policy"  style={{ color: "#f1f1f1", fontSize: '16px' }}>Chính sách giao hàng</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/Return-Policy"  style={{ color: "#f1f1f1", fontSize: '16px' }}>Chính sách đổi trả</NavLink>
                                </li>
                                <li>
                                    <NavLink to ="/Warranty"  style={{ color: "#f1f1f1", fontSize: '16px' }}>Chính sách bảo hành</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/Privacy" style={{ color: "#f1f1f1", fontSize: '16px' }}>Chính sách bảo mật</NavLink>

                                </li>
                            </WrapperFotterul>
                        </WrapperFooterabout>
                    </Col>
                    <Col span={4}>
                        <WrapperFooterabout>
                            <h3>THƯƠNG HIỆU</h3>
                            <WrapperFotterul>
                                <li>
                                    <NavLink  style={{ color: "#f1f1f1", fontSize: '16px' }}>Giày ADIDAS</NavLink>
                                </li>
                                <li>
                                    <NavLink  style={{ color: "#f1f1f1", fontSize: '16px' }}>Giày MLB</NavLink>
                                </li>
                                <li>
                                    <NavLink  style={{ color: "#f1f1f1", fontSize: '16px' }}>Giày NIKE</NavLink>
                                </li>
                                <li>
                                    <NavLink  style={{ color: "#f1f1f1", fontSize: '16px' }}>Giày ASICS</NavLink>
                                </li>
                                <li>
                                    <NavLink  style={{ color: "#f1f1f1", fontSize: '16px' }}>Giày CONVERSE</NavLink>
                                </li>
                                <li>
                                    <NavLink  style={{ color: "#f1f1f1", fontSize: '16px' }}>Giày PUMA</NavLink>
                                </li>
                                <li>
                                    <NavLink  style={{ color: "#f1f1f1", fontSize: '16px' }}>Giày VANS</NavLink>
                                </li>
                            </WrapperFotterul>
                        </WrapperFooterabout>
                    </Col>
                    <Col span={4}>
                        <div>
                            <h3>ĐĂNG KÍ NHẬN TIN</h3>
                            <span>Gửi email đăng kí để nhận thông báo mới nhất về khuyến mãi, sự kiện nỗi bật dành cho khách hàng.</span>
                            <WrapperFotterForm action="#">
                                <WrapperFotterInputGroup>
                                    <WrapperFotterInput type="text" placeholder="Nhập email" />
                                    <WrapperFooterButton type="submit" className="button-submit">đăng kí</WrapperFooterButton>
                                </WrapperFotterInputGroup>
                            </WrapperFotterForm>
                        </div>
                    </Col>
                </Row>
            </div>
        </WrapperFotter>
    )
}
export default FotterComponent