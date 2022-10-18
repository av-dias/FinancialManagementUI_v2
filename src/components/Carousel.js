import * as React from "react";
import CoreCarousel from "react-multi-carousel";
import Button from "../components/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import STATUS from "../utility/status";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: STATUS.FILTER_ITEMS.LARGE,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: STATUS.FILTER_ITEMS.DESKTOP,
    partialVisibilityGutter: 40, // this is optional if you are not using partialVisible props
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: STATUS.FILTER_ITEMS.TABLET,
    partialVisibilityGutter: 30, // this is optional if you are not using partialVisible props
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: STATUS.FILTER_ITEMS.MOBILE,
    partialVisibilityGutter: 30, // this is optional if you are not using partialVisible props
  },
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <>
      <div
        className={
          currentSlide === 0
            ? "carousel-button-left item-hidden"
            : "carousel-button-left"
        }
      >
        <IoIosArrowBack
          className="cursor-pointer"
          onClick={() => {
            if (currentSlide - rest.carouselState.slidesToShow - 1 < 0)
              goToSlide(0);
            else goToSlide(currentSlide - rest.carouselState.slidesToShow - 1);
          }}
        />
      </div>
      <div
        className={
          currentSlide ===
          rest.carouselState.totalItems - rest.carouselState.slidesToShow - 1
            ? "carousel-button-right item-hidden"
            : "carousel-button-right"
        }
      >
        <IoIosArrowForward
          className="cursor-pointer"
          onClick={() => {
            if (
              currentSlide + rest.carouselState.slidesToShow - 1 >
              rest.carouselState.totalItems -
                rest.carouselState.slidesToShow -
                1
            )
              goToSlide(
                rest.carouselState.totalItems -
                  rest.carouselState.slidesToShow -
                  1
              );
            else goToSlide(currentSlide + rest.carouselState.slidesToShow - 1);
          }}
        />
      </div>
    </>
  );
};

const Carousel = ({ purchaseType, setFilter, filter }) => {
  return (
    <CoreCarousel
      key={Math.random()}
      responsive={responsive}
      customButtonGroup={<ButtonGroup />}
      arrows={false}
    >
      {filter !== "overall" && (
        <Button
          key={Math.random()}
          textSize={10}
          shadow={1}
          onClick={() => {
            setFilter("overall");
          }}
          color={filter === "overall" ? "secondary" : null}
        >
          overall
        </Button>
      )}
      {purchaseType.map((item, i) => {
        if (item[0] !== filter)
          return (
            <Button
              key={Math.random()}
              textSize={10}
              shadow={1}
              onClick={() => {
                setFilter(item[0]);
              }}
              color={filter === item[0] ? "secondary" : null}
            >
              {item[0]}
            </Button>
          );
        else return null;
      })}
    </CoreCarousel>
  );
};

export default Carousel;
