import CardComponent from "../CardComponent/CardComponent";
import React from "react";
import { SectionCard } from "./style";
import Slider from "react-slick";
import { newestProductsSelector } from "../../pages/ProductsPage/selector";
import { useSelector } from "react-redux";

const SliderCardComponent = (props) => {
  const newestProducts = useSelector(newestProductsSelector);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <>
      <SectionCard>
        <div>
          <Slider {...settings}>
            {newestProducts.map((product) => (
              <CardComponent
                key={product._id}
                name={product.name}
                price={product.price}
                id={product._id}
                image={product.image}
              />
            ))}
          </Slider>
        </div>
      </SectionCard>
    </>
  );
};
export default SliderCardComponent;
