import { Checkbox, Rate } from "antd";
import React, { useEffect } from "react";
import {
  WrapperContent,
  WrapperLabelText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";

import { ProductSlice } from "../../redux/slice/ProductSlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const NavbarComponents = () => {
  const dispatch = useDispatch();

  const { searchProduct, updateSearchBy } = ProductSlice.actions;

  const onChange = () => {};

  const [searchParam] = useSearchParams();

  useEffect(() => {
    const type = searchParam.get("type");

    if (!!type) {
      dispatch(searchProduct(type));
      dispatch(updateSearchBy("type"));
    }
  }, [dispatch, searchParam, searchProduct, updateSearchBy]);

  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((options) => {
          return <WrapperTextValue>{options}</WrapperTextValue>;
        });
      case "checkbox":
        return options.map((option) => {
          return (
            <Checkbox
              value={option.value}
              key={option.value}
              checked={searchParam.get("type") === option.value}
            >
              {option.label}
            </Checkbox>
          );
        });
      case "checkboxsize":
        return (
          <Checkbox.Group
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
            onChange={onChange}
          >
            {options.map((option) => {
              return <Checkbox value={option.value}>{option.label}</Checkbox>;
            })}
          </Checkbox.Group>
        );
      case "start":
        return options.map((option) => {
          return (
            <div style={{ display: "flex", gap: "4px" }}>
              <Rate
                style={{ fontSize: "13px" }}
                disabled
                defaultValue={option}
              />
              <span>{`Từ ${option} sao`}</span>
            </div>
          );
        });
      case "price":
        return options.map((option) => {
          return <WrapperTextPrice>{option}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };
  return (
    <div >
      <WrapperLabelText>DANH MỤC</WrapperLabelText>
      <WrapperContent>
        {renderContent("text", [
          "ADIDAS",
          "ASICS",
          "CONVERSE",
          "MLB",
          "NIKE",
          "PUMA",
          "VANS",
        ])}
      </WrapperContent>
      <WrapperContent>
        {renderContent("checkbox", [
          { value: "giày nam", label: "GIÀY NAM" },
          { value: "giày nữ", label: "GIÀY NỮ" },
          { value: "giày trẻ em", label: "GIÀY TRẺ EM" },
        ])}
      </WrapperContent>
      <WrapperContent>
        {renderContent("checkbox", [
          { value: "a", label: "7" },
          { value: "b", label: "8" },
          { value: "c", label: "9" },
          { value: "d", label: "10" },
          { value: "e", label: "11" },
          { value: "f", label: "12" },
          { value: "g", label: "13" },
          { value: "h", label: "14" },
          { value: "k", label: "15" },
          { value: "l", label: "16" },
          { value: "m", label: "39" },
          { value: "n", label: "40" },
          { value: "o", label: "41" },
          { value: "p", label: "42" },
          { value: "j", label: "43" },
          { value: "x", label: "44" },
          { value: "z", label: "45" },
        ])}
      </WrapperContent>
      {/* <WrapperContent>{renderContent("start", [3, 4, 5])}</WrapperContent>
      <WrapperContent>
        {renderContent("price", [
          "Dưới 500.000đ",
          "Trên 500.000đ",
          "Từ 1.000.000đ đến 5.000.000đ",
        ])}
      </WrapperContent> */}
    </div>
  );
};
export default NavbarComponents;
