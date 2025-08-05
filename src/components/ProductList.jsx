import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

const products = [
    {
        img: '../assets/img/1.jpg',
        name: '티트리 퓨리파잉 토닉 100ML',
        origin: '20,000원',
        price: '13,000원',
        sale: '35%',
    },
    {
        img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        name: '로즈마리 미니 에센셜즈',
        origin: '4,000원',
        price: '3,600원',
        sale: '10%',
    },
    {
        img: 'https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad3?auto=format&fit=crop&w=600&q=80',
        name: '수딩 알로에 베라 겔 500ML',
        origin: '16,000원',
        price: '10,400원',
        sale: '35%',
    },
    {
        img: 'https://images.unsplash.com/photo-1522335789203-a2588f7b0f94?auto=format&fit=crop&w=600&q=80',
        name: '바이탈라이징 로즈마리 컨센트레이트 에센스 100ML',
        origin: '30,000원',
        price: '21,000원',
        sale: '30%',
    },
    {
        img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
        name: '네롤리 브라이트닝 페이셜 오일 30ML',
        origin: '26,000원',
        price: '19,500원',
        sale: '25%',
    },
    {
        img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
        name: '라벤더 릴렉싱 미스트 100ML',
        origin: '18,000원',
        price: '13,500원',
        sale: '25%',
    },
    {
        img: 'https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=600&q=80',
        name: '카렌듈라 수딩 크림 50ML',
        origin: '22,000원',
        price: '16,500원',
        sale: '25%',
    },
    {
        img: 'https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=600&q=80',
        name: '그린티 밸런싱 폼 클렌저 150ML',
        origin: '15,000원',
        price: '11,250원',
        sale: '25%',
    },
    {
        img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a13e6?auto=format&fit=crop&w=600&q=80',
        name: '비타민C 브라이트닝 세럼 30ML',
        origin: '32,000원',
        price: '24,000원',
        sale: '25%',
    },
    {
        img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
        name: '로즈 앱솔루트 마스크 100ML',
        origin: '28,000원',
        price: '21,000원',
        sale: '25%',
    },
];

function ProductList() {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);
    const progressBar = useRef(null);

    // ⭐ 카드 등장 애니메이션: Swiper 슬라이드 바뀔 때마다 트리거!
    const animateCards = () => {
        if (cardRefs.current) {
            gsap.fromTo(
                cardRefs.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.12,
                    duration: 0.8,
                    ease: 'power3.out',
                }
            );
        }
    };

    const onSlideChange = (swiper) => {
        if (progressBar.current) {
            const totalSlides = products.length;
            const slidesPerView = swiper.params.slidesPerView || 1;
            const maxIndex = totalSlides - slidesPerView;

            // 시작점: 0%, 마지막(4개 남음)에서 100%
            let percent;
            if (swiper.realIndex >= maxIndex) {
                percent = 1;
            } else {
                percent = swiper.realIndex / maxIndex;
            }
            progressBar.current.style.width = `${percent * 100}%`;
        }
        animateCards();
    };

    // 최초 mount 또는 스크롤 등장
    useEffect(() => {
        // Intersection Observer + animateCards
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCards();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
        // eslint-disable-next-line
    }, []);

    return (
        <section ref={sectionRef} className="bg-[#f8f6ef] py-16">
            <div className="w-full px-0">
                <div className="flex items-center justify-between mb-8 mx-5">
                    <h2 className="text-3xl font-bold">Product</h2>
                    <a href="#" className="text-sm font-medium underline">
                        view all
                    </a>
                </div>
                <div className="relative w-full max-w-none px-0 mx-0">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={32}
                        navigation={true}
                        modules={[Navigation]}
                        className="product-swiper w-full"
                        onSlideChange={onSlideChange}
                        onInit={onSlideChange}
                        breakpoints={{
                            320: { slidesPerView: 1.2, spaceBetween: 16 },
                            640: { slidesPerView: 2, spaceBetween: 16 },
                            1024: { slidesPerView: 4, spaceBetween: 32 },
                        }}
                    >
                        {products.map((p, idx) => (
                            <SwiperSlide key={idx}>
                                <div
                                    ref={(el) => (cardRefs.current[idx] = el)}
                                    className="bg-white rounded-lg overflow-hidden flex flex-col justify-between shadow group transition-shadow duration-300 hover:shadow-xl h-[700px] w-full"
                                >
                                    <div className="overflow-hidden h-4/5">
                                        <img
                                            src={p.img}
                                            alt={p.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-8 flex flex-col gap-2 h-1/5">
                                        <div className="font-medium text-lg text-gray-700 truncate">{p.name}</div>
                                        <div className="flex items-end gap-4 mt-2">
                                            <span className="text-gray-400 line-through text-base">{p.origin}</span>
                                            <span className="font-bold text-2xl text-gray-900">{p.price}</span>
                                            <span className="text-green-600 font-bold text-xl">{p.sale}</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        {/* 진행 바 (progress bar) */}
                        <div className="absolute left-0 bottom-0 w-full h-1 bg-gray-300 z-10">
                            <div
                                ref={progressBar}
                                className="h-full bg-black transition-all duration-300"
                                style={{ width: '0%' }}
                            ></div>
                        </div>
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default ProductList;
