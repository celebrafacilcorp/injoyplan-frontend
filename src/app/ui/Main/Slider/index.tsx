import Slider from "react-slick";
import styles from '../main.module.css'
import { useEffect } from "react";
import { IBannersState, useBannersStore } from "../../../zustand/banners";
import moment from "moment";
// import BannerSkeleton from "../../../components/Skeletons/banner";
import banner from '../../../../../public/svg/banner.svg'
import Image from "next/image";
import Angle from '../../../../../public/svg/angle_right.svg'
import Link from "next/link";
moment.locale('es');

const Slide = () => {

    const { getBanners, banners }: IBannersState = useBannersStore();

    var settings = {
        dots: true,
        infinite: true,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,  // Tablets and small laptops
                settings: {
                    slidesToShow: 1,  // Show 3 items
                    slidesToScroll: 1, // Scroll 3 items
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 768,   // Mobile landscape and small tablets
                settings: {
                    slidesToShow: 1,  // Show 2 items
                    slidesToScroll: 1, // Scroll 2 items
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 480,   // Mobile portrait
                settings: {
                    slidesToShow: 1,  // Show 1 item
                    slidesToScroll: 1, // Scroll 1 item
                    infinite: true,
                    dots: false,
                }
            }
        ]
    };

    useEffect(() => {
        getBanners();
    }, [])

    console.log(banners)

    return (
        <Slider className="slide" {...settings}>
            {/* { */}
            {/* // banners?.length === 0 ? ( */}
            {/* // banners.map((item: any) => ( */}

            <div>
                <div className="max-h-[410px]">
                    <Image src={banner} alt="banner" className="w-full h-full" objectFit="fill" />
                    <div className={styles.content__info}>
                        <div>
                            <h4>Estamos JOBdidos Vol. 2</h4>
                            <div className={styles.date__format}>
                                <div>
                                    VIE 15 ENE
                                    {/* {moment(item.FechaInicio).format('ddd').toUpperCase()} */}
                                    <div>
                                        20:00 - 21:00 Joinnus Live
                                        {/* {moment(item.FechaInicio).format('DD MMM').toUpperCase()} */}
                                    </div>
                                </div>
                                <div style={{ marginLeft: "10px" }}>
                                    {/* {item.HoraInicio}-{item.HoraFinal} */}
                                </div>
                            </div>
                            <a rel="noopener noreferrer" target="_blank" 
                            // href={`https://${item.urlFuente}`}
                            >Conoce más</a>
                        </div>
                    </div>

                </div>
                <Link className='absolute bottom-[-20px] z-50 flex text-[11px] mt-2 text-[#A3ABCC] font-bold' href={`#`} target="_blank" rel="noopener noreferrer">
                    VER FUENTE
                    <Image className='ml-1' src={Angle} height={10} width={10} alt='Angulo' />
                </Link>
            </div>
            {/* )
                ) : <BannerSkeleton />
            } */}
        </Slider>
    )
}

export default Slide;