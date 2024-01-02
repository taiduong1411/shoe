import * as UserServices from "../../services/UserServices";

import { Badge, Col, Popover, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  LogoHeader,
  MenuLiHeaderHover,
  MenuUlHeader,
  MenuUlHeaderDropDown,
  WapperContactHeader,
  WapperMenuHeader,
  WapperTextContactHeader,
  WapperTextHeader,
  WrapperContentPopup,
  WrapperHeader,
} from "./style";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { ProductSlice } from "../../redux/slice/ProductSlice";
import logo from "../../img/Logo1.png";
import { resetUser } from "../../redux/slice/UserSlice";

const HeaderComponent = ({ isHiddenMenu = false }) => {
  const { searchProduct, updateSearchBy, updateCurrentPage } =
    ProductSlice.actions;

  const menus = [
    {
      name: "TRANG CHỦ",
      path: "/",
    },
    {
      name: "SẢN PHẨM",
      path: "/product",
      isShowSubmenu: false,
      onClick: () => {
        dispatch(updateCurrentPage(1));
        dispatch(searchProduct(""));
        dispatch(updateSearchBy("name"));
      },
      child: [
        {
          name: "GIÀY NAM",
          path: "/product?type=giày nam",
          onClick: () => {
            dispatch(updateCurrentPage(1));
            dispatch(searchProduct("giày nam"));
            dispatch(updateSearchBy("type"));
          },
        },
        {
          name: "GIÀY NỮ",
          path: "/product?type=giày nữ",
          onClick: () => {
            dispatch(updateCurrentPage(1));
            dispatch(searchProduct("giày nữ"));
            dispatch(updateSearchBy("type"));
          },
        },
        {
          name: "GIÀY TRẺ EM",
          path: "/product?type=giày trẻ em",
          onClick: () => {
            dispatch(updateCurrentPage(1));
            dispatch(searchProduct("giày trẻ em"));
            dispatch(updateSearchBy("type"));
          },
        },
        {
          name: "PHỤ KIỆN GIÀY",
          path: "",
        },
      ],
    },
    {
      name: "DỊCH VỤ",
      path: "",
    },
    {
      name: "TIN TỨC",
      path: "/news",
    },
    {
      name: "LIÊN HỆ",
      path: "",
    },
  ];

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [typeProducts, setTypeProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const order = useSelector((state) => state.order);
  const [pending, setPending] = useState(false);
  const handleNavigateLogin = () => {
    navigate("sign-in");
  };
  const handleLogout = async () => {
    setPending(true);
    await UserServices.logoutUser();
    dispatch(resetUser());
    setPending(false);
  };

  // const fetchAllTypeProduct = async () => {
  //     const res = await ProductServices.getAllTypeProduct()
  //     setTypeProducts(res?.data?.child)
  // }

  // useEffect(() => {
  //     fetchAllTypeProduct()
  // }, [])
  useEffect(() => {
    setPending(true);
    setUserName(user?.name);
    setPending(false);
  }, [user?.name]);

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Thông Tin Người Dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          Quản Lý Hệ Thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>
        Đơn hàng của tôi
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng Xuất
      </WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  return (
    <div>
      <div>
        <WrapperHeader>
          <Col span={3}></Col>
          <Col span={9}>
            <WapperTextHeader>Tự Tin Đi Cùng Với Phong Cách</WapperTextHeader>
          </Col>
          <Col span={9}>
            <WapperContactHeader>
              <div>
                <i className="fa-solid fa-phone"></i>
                <WapperTextContactHeader>
                  {" "}
                  Hotline: 0353955259
                </WapperTextContactHeader>
              </div>
              <div>
                <i className="fa-solid fa-envelope"></i>
                <WapperTextContactHeader>
                  ShopFP@gmail.com
                </WapperTextContactHeader>
              </div>

              <div style={{ display: "flex", cursor: "pointer" }}>
                <LoadingComponent isPending={pending}>
                  <i className="fa-solid fa-user"></i>
                  {user?.access_token ? (
                    <>
                      <Popover
                        content={content}
                        trigger="click"
                        open={isOpenPopup}
                      >
                        <WapperTextContactHeader
                          onClick={() => setIsOpenPopup((prev) => !prev)}
                        >
                          {userName?.length ? userName : user?.email}
                        </WapperTextContactHeader>
                      </Popover>
                    </>
                  ) : (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={handleNavigateLogin}
                    >
                      <WapperTextContactHeader>
                        Tài Khoản
                      </WapperTextContactHeader>
                    </div>
                  )}
                </LoadingComponent>
              </div>
            </WapperContactHeader>
          </Col>
          <Col span={3}></Col>
        </WrapperHeader>
      </div>
      <div>
        <Row style={{ alignItems: "center", height: "130px" }}>
          <Col span={3}></Col>
          <Col span={6}>
            <LogoHeader>
              <img
                src={logo}
                alt="lego"
                style={{ width: "100%", height: "130px" }}
              />
            </LogoHeader>
          </Col>
          <Col span={8}>
            <ButtonInputSearch
              size="large"
              textButton="Tìm Kiếm"
              placeholder="Nhập tên sản phẩm"
              onChange={onSearch}
            />
          </Col>
          <Col span={4}>
            <div
              style={{ cursor: "pointer", textAlign: "center" }}
              onClick={() => navigate("/order")}
            >
              <Badge count={order?.orderItems?.length} size="small">
                <i
                  style={{ fontSize: "25px", cursor: "pointer" }}
                  className="fa-solid fa-cart-shopping"
                ></i>
              </Badge>
            </div>
          </Col>
          <Col span={3}></Col>
        </Row>
      </div>
      <WapperMenuHeader>
        <div>
          <Row>
            <Col span={6}></Col>
            {!isHiddenMenu && (
              <Col span={12}>
                <nav>
                  <MenuUlHeader>
                    {menus?.map((menu, menuKey) => (
                      <MenuLiHeaderHover key={menuKey}>
                        <Link to={menu?.path} onClick={menu.onClick}>
                          {menu?.name}
                        </Link>
                        {menu.child && (
                          <MenuUlHeaderDropDown>
                            {menu.child.map((childItem, childKey) => (
                              <li key={`${menuKey}-${childKey}`}>
                                <Link
                                  to={childItem.path}
                                  onClick={childItem.onClick}
                                >
                                  {childItem.name}
                                </Link>
                              </li>
                            ))}
                          </MenuUlHeaderDropDown>
                        )}
                      </MenuLiHeaderHover>
                    ))}
                  </MenuUlHeader>
                </nav>
              </Col>
            )}
            <Col span={6}></Col>
          </Row>
        </div>
      </WapperMenuHeader>
      <div></div>
    </div>
  );
};
export default HeaderComponent;
