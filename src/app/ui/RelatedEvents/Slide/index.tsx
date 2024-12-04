import Slider from "react-slick";
import styles from './slide.module.css'
import Card from "@/app/components/Card";
import { Event } from "@/app/interfaces/event";

const Slide = ({ categoriesRelations }: any) => {

    console.log(categoriesRelations)

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        centerMode: true,
        centerPadding: "0px",
        slidesToScroll: 4,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,  // Tablets and small laptops
                settings: {
                    slidesToShow: 3,  // Show 3 items
                    slidesToScroll: 3, // Scroll 3 items
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 768,   // Mobile landscape and small tablets
                settings: {
                    slidesToShow: 2,  // Show 2 items
                    slidesToScroll: 2, // Scroll 2 items
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

    console.log(categoriesRelations)

    return (
        <div>
            <Slider {...settings} className={styles.slick__categories}>
                {
                    categoriesRelations?.map((item: Event, index: number) => {
                        return (
                            <Card addFavoritesByUser={() => {}} key={index} item={item} />
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default Slide;