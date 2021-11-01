import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Carousel } from "antd";

export module css {
    export const jar = height => ({ position: "relative", width: "100%" } as any);
    export const slide = css => ({
        display: "inline-block",
        verticalAlign: "middle",
        backgroundPosition:  "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        ...css        
    });
}

export const portraitSlides = [
    //{ img: 'private_label.png', href: '' },
    //{ img: 'Aerosols.png', href: '' },
    //{ img: 'HandCleaners.png', href: '' },
    //{ img: 'LiquidProducts.png', href: '' },
    //{ img: 'WetWipes.png', href: '' },
    { img: 'build_your_brand.png', href: '' },
    { img: 'increase_profits.png', href: '' },
    { img: 'industry_best.png', href: '' },    
];
export const portraitFolder =`/images/slider/tony/mobile/`;
export const portraitRatio = 320/508;
export const landscapeSlides = portraitSlides;
export const landscapeFolder = `/images/slider/tony/`;
export const landscapeRatio = 1280/320;

export const Slider: React.FC<TSliderMerged> = ({ mobile, width, }) => {

    let slides = mobile ? portraitSlides : landscapeSlides;
    let ratio = mobile ? portraitRatio : landscapeRatio;
    let folder = mobile ? portraitFolder : landscapeFolder;
    let height = width / ratio;

    const resize = () => {                
        if(typeof window !== 'undefined'){
            let carousel = window.document.getElementsByClassName("carousel_home_slider")[0];
            Array.prototype.forEach.call(carousel.getElementsByClassName("slick-slide"), (el: any) => { el.style.height = el.style.lineHeight = height + "px"; });
        }
    };
    
    useEffect(() => {
        resize();
    }, [width,mobile]);

    return <div style={css.jar(height)} className="carousel_home_slider">
        <Carousel arrows={false} style={{ height: height + "px" }} autoplay={true} autoplaySpeed={7500} speed={1000}>
            {
                slides.map((slide, index) => <div key={index}>
                    <div style={css.slide({ backgroundImage: `url(${folder}${slide.img})`, width, height })} />
                </div>)
            }
        </Carousel>
    </div>;

};

export const mapState = state => ({
    mobile: state.settings.mobile,
    width: state.settings.width,
});
export const mapDispatch = dispatch => ({ dispatch });

export default (connect(mapState, mapDispatch)(Slider)) as React.FC<TSlider>;