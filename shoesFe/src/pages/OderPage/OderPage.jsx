import { Button, Checkbox, Form } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDelivery, WrapperTotal } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import imag from '../../assets/avatar/avarts.jpg'
import { WrapperInputNumber, WrapperQualityProduct } from '../../components/ProductDetailsComponent/style';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, seletedOrder } from '../../redux/slice/OderSlice';
import { convertPrice } from '../../utils';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from "../../services/UserServices";
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import * as message from "../../components/Message/Message"
import { updateUser } from '../../redux/slice/UserSlice';
import { useNavigate } from 'react-router-dom';
import StepComponent from '../../components/StepComponent/StepComponent';






const OderPage = () => {

    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [listChecked, setListChecked] = useState([])
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',

    })
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const dispatch = useDispatch()
    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value)
            setListChecked(newListChecked)
        } else {
            setListChecked([...listChecked, e.target.value])
        }
    };

    const handleChangeCount = (type, idProduct, limited) => {
        if (type === 'increase') {
            if (!limited) {
                dispatch(increaseAmount({ idProduct }))
            }
        } else {
            if (!limited) {
                dispatch(decreaseAmount({ idProduct }))
            }
        }
    }


    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }))

    }

    const handleOnchangeCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = []
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product)
            })
            setListChecked(newListChecked)
        } else {
            setListChecked([])
        }
    }

    useEffect(() => {
        dispatch(seletedOrder({ listChecked }))
    }, [listChecked])


    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])


    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone
            })
        }

    }, [isOpenModalUpdateInfo])


    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }

    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [order])

    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo >= 1000000 && priceMemo < 1500000) {
            return 10000
        } else if (priceMemo >= 1500000 || order?.orderItemsSelected?.length === 0) {
            return 0
        } else {
            return 25000
        }
    }, [priceMemo])


    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) + Number(diliveryPriceMemo)
    }, [priceMemo, diliveryPriceMemo])

    const handleRemoveAllProduct = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }))
        }
    }

    const handleAddCard = () => {
        if (!order?.orderItemsSelected?.length) {
            message.error('vui lòng chọn sản phẩm')
        } else if (!user?.name || !user.address || !user.phone || !user.city) {
            setIsOpenModalUpdateInfo(true)
        } else {
            navigate('/payment')
        }
    }

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = UserService.updateUser(
                id,

                { ...rests }, token)
            return res
        }
    )

    const { isPending, data } = mutationUpdate

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        })
        form.resetFields()
        setIsOpenModalUpdateInfo(false)
    }
    const handleUpdateInforUser = () => {
        const { name, phone, address, city } = stateUserDetails
        if (name && phone && address && city) {
            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
                onSuccess: () => {
                    dispatch(updateUser({ name, phone, address, city }))

                    setIsOpenModalUpdateInfo(false)
                }
            })
        }
    }

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })

    }

    const itemsDelivery = [
        {
            title: '0đ ',
            description: 'Trên 1,500,000đ',
        },
        {
            title: '10,000đ',
            description: 'Từ 1,000,000đ đến 1,500,000đ',
        },
        {
            title: '25,000 đ',
            description: 'Dưới 1,000,000đ',
        },

    ]
    return (
        <div style={{ background: '#f5f5f5', width: '100%', height: '100vh' }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h2>Giỏ hàng</h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        <WrapperStyleHeaderDelivery>
                            <StepComponent items={itemsDelivery}
                                current={diliveryPriceMemo === 10000 ? 1 : diliveryPriceMemo === 25000 ? 2
                                    : order?.orderItemsSelected?.length === 0 ? 0 : 3} />
                        </WrapperStyleHeaderDelivery>
                        <WrapperStyleHeader>
                            <span style={{ display: 'inline-block', width: '390px' }}>
                                <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
                                <span>Tất cả ({order?.orderItems?.length} sản phẩm )</span>
                            </span>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>Đơn giá</span>
                                <span>Số lượng </span>
                                <span>Thành tiền</span>
                                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllProduct} />
                            </div>
                        </WrapperStyleHeader>
                        <WrapperListOrder>
                            {order?.orderItems?.map((order) => {
                                return (
                                    <WrapperItemOrder>
                                        <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                                            <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                                            <div
                                                style={{
                                                    width: 260,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >{order?.name}</div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>
                                                    {convertPrice(order?.price)}
                                                </span>
                                            </span>
                                            <WrapperCountOrder>
                                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product,
                                                    order?.amount === 1)}>
                                                    <MinusOutlined style={{ color: '#000', fontSize: '10px' }} min={1} />

                                                </button>
                                                <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order?.countInStock} />
                                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product,
                                                    order?.amount === order?.countInStock)}>
                                                    <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                </button>
                                            </WrapperCountOrder>
                                            <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(order?.price * order?.amount)}</span>
                                            <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                                        </div>
                                    </WrapperItemOrder>
                                )
                            })}
                        </WrapperListOrder>
                    </WrapperLeft>
                    <WrapperRight>
                        <div style={{ width: '100%' }}>
                            <WrapperInfo>
                                <div>
                                    <span>
                                        Địa chỉ:
                                    </span>
                                    <span style={{ color: 'red', textDecoration: 'underline', paddingLeft: '5px' }}>
                                        {`${user?.address} ${user?.city}`}
                                    </span>
                                    <span onClick={handleChangeAddress} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                                        Thay đổi
                                    </span>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Tạm tính</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Giảm giá</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0%</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Phí giao hàng</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</span>
                                </div>
                            </WrapperInfo>
                            <WrapperTotal>
                                <span>Tổng tiền</span>
                                <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                                    <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                </span>
                            </WrapperTotal>
                        </div>
                        <ButtonComponent
                            onClick={() => handleAddCard()}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '320px',
                                border: 'none',
                                borderRadius: '4px'
                            }}

                            textButton={'Mua hàng'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        >
                        </ButtonComponent>
                    </WrapperRight>

                </div>

            </div>
            <ModalComponent forceRender title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInforUser}>
                <LoadingComponent isPending={isPending}>

                    <Form
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        // onFinish={onUpdateUser}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your count phone!' }]}
                        >
                            <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />

                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your count address!' }]}
                        >
                            <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />

                        </Form.Item>
                        <Form.Item
                            label="City"
                            name="city"
                            rules={[{ required: true, message: 'Please input your count city!' }]}
                        >
                            <InputComponent value={stateUserDetails.city} onChange={handleOnchangeDetails} name="city" />

                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </ModalComponent>

        </div >
    )
}
export default OderPage