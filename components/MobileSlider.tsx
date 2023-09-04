import React from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { MobileSliderProps } from "../utils/types";
import { useRouter } from "next/router";

const MobileSlider = ({
  images,
  activeSlide,
  setActiveSlide,
}: MobileSliderProps): JSX.Element => {
  const sliderSettings = {
    dots: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => setActiveSlide(current),
    appendDots: (dots: React.ReactElement[]) => (
      <div>
        <p className="text-white bg-gray-900/60 px-2 font-semibold py-1 text-center justify-end absolute right-7 -mt-20 rounded-md text-xs w-18">{`${
          activeSlide + 1
        } / ${dots.length}`}</p>
      </div>
    )
  };
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="sm:hidden w-full overflow-hidden justify-center">
      <Slider {...sliderSettings}>
        {images.map(({ id, public_id, format, blurDataUrl }) => (
          <Link
            key={id}
            href={`${slug}/?photoId=${id}`}
            as={`${slug}?photoId=${id}`}
            shallow
          >
            <div key={id} className="w-full h-[300px]">
              <Image
                alt="Foto de Casa en Centro de Villa Carlos Paz"
                className="w-full h-full object-cover"
                placeholder="blur"
                priority={true}
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                (max-width: 1280px) 50vw,
                (max-width: 1536px) 33vw,
                25vw"
              />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default MobileSlider;
