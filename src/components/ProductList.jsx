import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// ✅ public 폴더 기준 경로를 권장합니다: /assets/img/1.jpg ...
// (./src/assets/... 로 하면 빌드/배포 시 경로 이슈가 발생할 수 있어요)
const PRODUCTS = [
  { id: 1,  name: 'Natural Face Cream', desc: '자연스러운 보습 효과',     price: 25000, image: '/assets/img/1.jpg', category: 'skincare' },
  { id: 2,  name: 'Organic Serum',      desc: '유기농 성분 세럼',         price: 35000, image: '/assets/img/2.jpg', category: 'skincare' },
  { id: 3,  name: 'Herbal Cleanser',    desc: '허브 추출물 순한 클렌징',   price: 18000, image: '/assets/img/3.jpg', category: 'skincare' },
  { id: 4,  name: 'Aroma Oil',          desc: '리프레시 아로마 블렌드',    price: 22000, image: '/assets/img/4.jpg', category: 'wellness' },
  { id: 5,  name: 'Calming Toner',      desc: '민감 피부 진정 토너',       price: 21000, image: '/assets/img/5.jpg', category: 'skincare' },
  { id: 6,  name: 'Daily Sun Gel',      desc: '가벼운 젤 타입 차단',       price: 15000, image: '/assets/img/1.jpg', category: 'skincare' },
  { id: 7,  name: 'Revive Eye Cream',   desc: '눈가 탄력 집중 케어',       price: 29000, image: '/assets/img/2.jpg', category: 'skincare' },
  { id: 8,  name: 'Body Scrub',         desc: '부드러운 각질 케어',         price: 17000, image: '/assets/img/3.jpg', category: 'body'     },
  { id: 9,  name: 'Bath Salt',          desc: '피로 회복 입욕 솔트',        price: 16000, image: '/assets/img/4.jpg', category: 'wellness' },
  { id: 10, name: 'Hair Treatment',     desc: '건조 모발 영양 집중',        price: 24000, image: '/assets/img/5.jpg',category: 'hair'     },
];

function ProductList() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const progressBar = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      setProducts(PRODUCTS);
      setError(null);
    } catch (e) {
      setError('제품 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  // ⭐ 카드 등장 애니메이션: Swiper 슬라이드 바뀔 때마다 트리거!
  const animateCards = () => {
    const nodes = (cardRefs.current || []).filter(Boolean);
    if (nodes.length) {
      gsap.fromTo(
        nodes,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out' }
      );
    }
  };

  const onSlideChange = (swiper) => {
    if (progressBar.current && products.length > 0) {
      const total = products.length;
      const spv = typeof swiper.params.slidesPerView === 'number' ? swiper.params.slidesPerView : 1;
      const maxIndex = Math.max(1, total - spv);
      const percent = swiper.realIndex >= maxIndex ? 1 : swiper.realIndex / maxIndex;
      progressBar.current.style.width = `${percent * 100}%`;
    }
    animateCards();
  };

  // 최초 mount 또는 스크롤 등장
  useEffect(() => {
    if (products.length > 0) {
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
            <a href="#" className="text-sm font-medium underline">view all</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[420px] rounded-xl bg-white shadow animate-pulse" />
            ))}
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
            <a href="#" className="text-sm font-medium underline">view all</a>
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
          <a href="#" className="text-sm font-medium underline">view all</a>
        </div>

        <div className="relative w-full max-w-none px-0 mx-0">
          <Swiper
            modules={[Navigation]}
            navigation
            speed={600}
            slidesPerView={4}
            spaceBetween={24}
            onSlideChange={onSlideChange}
            onInit={(swiper) => {
              // 초기 진척도 0으로 설정 + 첫 애니메이션
              if (progressBar.current) progressBar.current.style.width = '0%';
              animateCards();
            }}
            className="product-swiper w-full"
            breakpoints={{
              320:  { slidesPerView: 1.15, spaceBetween: 16 },
              640:  { slidesPerView: 2,    spaceBetween: 18 },
              900:  { slidesPerView: 3,    spaceBetween: 20 },
              1200: { slidesPerView: 4,    spaceBetween: 24 },
            }}
          >
            {products.map((p, idx) => (
              <SwiperSlide key={p.id ?? idx}>
                <div
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* 이미지 영역: 고정 비율 카드 */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={900}
                      height={1200}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* 정보 영역 */}
                  <div className="p-5 flex flex-col gap-1">
                    <div className="text-base font-semibold text-gray-800 line-clamp-1">{p.name}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{p.desc}</div>
                    <div className="mt-2 text-2xl font-bold tracking-tight">{p.price.toLocaleString()}원</div>
                  </div>

                  {/* 카테고리 배지 */}
                  <div className="absolute left-3 top-3 text-[11px] uppercase tracking-wide bg-black/70 text-white px-2.5 py-1 rounded-full">
                    {p.category}
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* 진행 바 */}
            <div className="absolute left-0 bottom-0 w-full h-1 bg-gray-300 z-10">
              <div ref={progressBar} className="h-full bg-black transition-all duration-300" style={{ width: '0%' }} />
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default ProductList;