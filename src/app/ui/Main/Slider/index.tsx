import Slider from "react-slick";
import { useEffect } from "react";
import { IBannersState, useBannersStore } from "../../../zustand/banners";
import moment from "moment";
import Image from "next/image";
import Angle from '../../../../../public/svg/angle_right.svg';
import Link from "next/link";
import BannerSkeleton from "@/app/components/Skeletons/banner";
moment.locale('es');

const Slide = () => {
    const { getBanners, banners }: IBannersState = useBannersStore();

    const settings = {
        dots: true,
        infinite: true,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                }
            }
        ]
    };

    useEffect(() => {
        getBanners();
    }, []);

    return (
        <Slider className="slide" {...settings}>
            {banners?.length > 0 ? (
                banners.map((item: any, index: number) => (
                    <div key={index} className="h-full">
                        <div className="h-full relative">
                            <Image src={item.url} alt="banner" width={100} height={100} className="w-full h-full object-cover" />
                            <div className="absolute md:top-36 top-24 left-10">
                                <div>
                                    <h4 className="bg-customText text-[#fff] rounded rounded-bl-none rounded-tl-none text-2xl md:text-3xl p-2 w-fit">{item.titulo}</h4>
                                    <div className="flex items-center w-fit bg-customText text-[#fff] rounded rounded-bl-none rounded-tl-none text-md p-2">
                                        <p className="ml-2">VIE <strong className="font-normal block">15 ENE</strong></p>
                                        <div className="border-l border-solid border-[#fff] ml-4">
                                            <p className="ml-3">20:00 - 21:00 Joinnus Live</p>
                                        </div>
                                    </div>
                                    <a className="bg-customText p-3 text-md relative top-2 rounded uppercase text-[#fff]" rel="noopener noreferrer" target="_blank" href={item.urlFuente || "#"}>
                                        Conoce más
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Link className="absolute md:bottom-[-0px] bottom-[-5px] z-50 flex justify-center text-[11px] md:text-left xl:text-left md:justify-start mt-2 text-[#A3ABCC] font-bold w-full text-center" href={item.urlFuente || "#"} target="_blank" rel="noopener noreferrer">
                            VER FUENTE
                            <Image className="ml-1 relative top-0.5" src={Angle} height={10} width={10} alt="Angulo" />
                        </Link>
                    </div>
                ))
            ) : (
                <BannerSkeleton />
            )}
        </Slider>
    );
};

export default Slide;