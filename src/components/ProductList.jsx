import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { productApi } from '../services/api';

function ProductList() {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);
    const progressBar = useRef(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        if (progressBar.current && products.length > 0) {
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

    // 제품 데이터 로드
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productApi.getProducts();
                if (response.success) {
                    setProducts(response.data);
                } else {
                    setError('제품 데이터를 불러오는데 실패했습니다.');
                }
            } catch (err) {
                console.error('제품 로드 오류:', err);
                setError('제품 데이터를 불러오는데 실패했습니다.');
                // API 오류 시 기본 데이터 사용
                setProducts([
                    {
                        id: 1,
                        name: 'Natural Face Cream',
                        description: '자연스러운 보습 효과',
                        price: 25000,
                        image: '/assets/img/1.jpg',
                        category: 'skincare'
                    },
                    {
                        id: 2,
                        name: 'Organic Serum',
                        description: '유기농 성분으로 만든 세럼',
                        price: 35000,
                        image: '/assets/img/2.jpg',
                        category: 'skincare'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // 최초 mount 또는 스크롤 등장
    useEffect(() => {
        if (products.length > 0) {
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
        }
    }, [products]);

    if (loading) {
        return (
            <section className="bg-[#f8f6ef] py-16">
                <div className="w-full px-0">
                    <div className="flex items-center justify-between mb-8 mx-5">
                        <h2 className="text-3xl font-bold">Product</h2>
                        <a href="#" className="text-sm font-medium underline">
                            view all
                        </a>
                    </div>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg text-gray-600">제품을 불러오는 중...</div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-[#f8f6ef] py-16">
                <div className="w-full px-0">
                    <div className="flex items-center justify-between mb-8 mx-5">
                        <h2 className="text-3xl font-bold">Product</h2>
                        <a href="#" className="text-sm font-medium underline">
                            view all
                        </a>
                    </div>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg text-red-600">{error}</div>
                    </div>
                </div>
            </section>
        );
    }

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
                        {products.map((product, idx) => (
                            <SwiperSlide key={product.id || idx}>
                                <div
                                    ref={(el) => (cardRefs.current[idx] = el)}
                                    className="bg-white rounded-lg overflow-hidden flex flex-col justify-between shadow group transition-shadow duration-300 hover:shadow-xl h-[700px] w-full"
                                >
                                    <div className="overflow-hidden h-4/5">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-8 flex flex-col gap-2 h-1/5">
                                        <div className="font-medium text-lg text-gray-700 truncate">{product.name}</div>
                                        <div className="flex items-end gap-4 mt-2">
                                            <span className="font-bold text-2xl text-gray-900">
                                                {product.price?.toLocaleString()}원
                                            </span>
                                        </div>
                                        {product.description && (
                                            <div className="text-sm text-gray-500 truncate">{product.description}</div>
                                        )}
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
