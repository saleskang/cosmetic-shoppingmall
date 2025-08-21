import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import Img1 from '/assets/img/1.jpg';
import Img2 from '/assets/img/2.jpg';
import Img3 from '/assets/img/3.jpg';
import Img4 from '/assets/img/4.jpg';
import Img5 from '/assets/img/5.jpg';


import gsap from 'gsap';


const slides = [
  { title: "Slide 1", desc: "지상 최고 온천수 비누입니다." },
  { title: "Slide 2", desc: "지상 최고의 화장품 ." },
  { title: "Slide 3", desc: "세계최강의 화장품 팝니다" },
  { title: "Slide 4", desc: "세계최강의 화장품 팝니다" },
  { title: "Slide 5", desc: "세계최강의 화장품 팝니다" },
];

const images = [
Img1,Img2,Img3,Img4,Img5
]

  
function MainImage() {
  const progressBar = useRef(null);
  const textRefs = useRef([]);

  const onSlideChange = (swiper) => {
    textRefs.current.forEach(ref => {
      if (ref) gsap.set(ref, { opacity: 0, y: 30 });
    });
    const idx = swiper.realIndex;
    if (textRefs.current[idx]) {
      gsap.to(textRefs.current[idx], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.1,
      });
    }
  };

  useEffect(() => {
    if (textRefs.current[0]) {
      gsap.fromTo(textRefs.current[0], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 });
    }
  }, []);

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    if (progressBar.current) {
      progressBar.current.style.width = `${progress * 100}%`;
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={true}
        effect="slide"
        modules={[Autoplay, Pagination, Navigation]}
        onSlideChange={onSlideChange}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="h-full w-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-screen w-full">
              <img
                src={images[i]}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 flex flex-col items-start justify-center h-full pl-[10vw]">
                <h2
                  ref={el => textRefs.current[i] = el}
                  className="text-6xl font-extrabold text-white drop-shadow-lg mb-5"
                >
                  {s.title}
                </h2>
                <p className="text-white text-2xl mb-10">{s.desc}</p>
                <button className="bg-white/80 hover:bg-white text-black font-bold px-8 py-3 rounded-full text-lg shadow transition">
                  자세히 보기
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* 네모 progress bar */}
        <div className="absolute left-0 bottom-0 w-full h-1 bg-white/30 z-20">
          {/* <div
            ref={progressBar}
            className="h-full bg-blue-500 transition-all duration-200"
            style={{ width: '0%' }}
          ></div> */}
        </div>
      </Swiper>
    </div>
  );
}

export default MainImage;
