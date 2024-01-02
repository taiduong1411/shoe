import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";
const ProductDetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <>
            <div style={{ width: '100%', background: '#efefef' }}>
                <div style={{ width: '1270px', height: '100%', margin: '0 auto' }}>
                    <h5><span style={{ cursor: 'pointer', fontWeight: 'bolod' }} onClick={() => { navigate('/') }}>TRANG CHỦ</span>-CHI TIẾT SẢN PHẨM</h5>
                    <ProductDetailsComponent idProduct={id} />
                </div>
            </div>
        </>
    )
}
export default ProductDetailsPage