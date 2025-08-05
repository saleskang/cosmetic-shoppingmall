import Img1 from '../assets/img/1.jpg';
import Img2 from '../assets/img/2.jpg';

import React, { useRef } from 'react';
import gsap from 'gsap';

function Story() {
    // Story 카드 ref
    const imgRef1 = useRef(null);
    const underlineRef1 = useRef(null);
    const viewMoreRef1 = useRef(null);
    // Refill 카드 ref
    const imgRef2 = useRef(null);
    const underlineRef2 = useRef(null);
    const viewMoreRef2 = useRef(null);

    // 이미지 hover 애니메이션 (공용)
    const handleImgEnter = (ref) => {
        gsap.to(ref.current, { scale: 1.08, filter: 'brightness(1.1)', duration: 0.5, ease: 'power3.out' });
    };
    const handleImgLeave = (ref) => {
        gsap.to(ref.current, { scale: 1, filter: 'brightness(1)', duration: 0.6, ease: 'power3.out' });
    };

    // view more hover 애니메이션 (공용)
    const handleViewMoreEnter = (refUnderline, refText) => {
        gsap.to(refUnderline.current, { scaleX: 1, transformOrigin: 'left', duration: 0.4, ease: 'power2.out' });
        gsap.to(refText.current, { letterSpacing: 2, color: '#38bdf8', duration: 0.4, ease: 'power2.out' });
    };
    const handleViewMoreLeave = (refUnderline, refText) => {
        gsap.to(refUnderline.current, { scaleX: 0, transformOrigin: 'right', duration: 0.4, ease: 'power2.in' });
        gsap.to(refText.current, { letterSpacing: 0, color: '#fff', duration: 0.4, ease: 'power2.in' });
    };

    return (
        <div className="w-full flex h-[400px] bg-[#f8f6ef]">
            {/* Story 카드 */}
            <div className="w-1/2 relative">
                <img
                    src={Img1}
                    alt=""
                    ref={imgRef1}
                    className="w-full h-full object-cover"
                    onMouseEnter={() => handleImgEnter(imgRef1)}
                    onMouseLeave={() => handleImgLeave(imgRef1)}
                    style={{ willChange: 'transform, filter' }}
                />
                <div className="absolute left-0 bottom-0 p-12 text-white select-none">
                    <h2 className="text-4xl font-bold mb-4">Story</h2>
                    <p className="mb-6 text-lg leading-snug">
                        아로마티카는 아로마테라피의 정수를 담아<br />
                        안전하고 건강한 아름다움을 표방합니다.
                    </p>
                    <a
                        href="#"
                        ref={viewMoreRef1}
                        className="relative text-base inline-block"
                        onMouseEnter={() => handleViewMoreEnter(underlineRef1, viewMoreRef1)}
                        onMouseLeave={() => handleViewMoreLeave(underlineRef1, viewMoreRef1)}
                    >
                        view more
                        <span
                            ref={underlineRef1}
                            className="block absolute left-0 -bottom-1 h-[2px] bg-cyan-400 w-full scale-x-0"
                            style={{
                                transformOrigin: 'right',
                                transition: 'transform 0.3s',
                            }}
                        />
                    </a>
                </div>
            </div>
            {/* Refill 카드 */}
            <div className="w-1/2 relative">
                <img
                    src={Img2}
                    alt=""
                    ref={imgRef2}
                    className="w-full h-full object-cover"
                    onMouseEnter={() => handleImgEnter(imgRef2)}
                    onMouseLeave={() => handleImgLeave(imgRef2)}
                    style={{ willChange: 'transform, filter' }}
                />
                <div className="absolute left-0 bottom-0 p-12 text-white">
                    <h2 className="text-4xl font-bold mb-4">Refill</h2>
                    <p className="mb-6 text-lg leading-snug">
                        아로마티카의 지속 가능한 라이프,<br />
                        리필로 시작하세요.
                    </p>
                    <a
                        href="#"
                        ref={viewMoreRef2}
                        className="relative text-base inline-block"
                        onMouseEnter={() => handleViewMoreEnter(underlineRef2, viewMoreRef2)}
                        onMouseLeave={() => handleViewMoreLeave(underlineRef2, viewMoreRef2)}
                    >
                        view more
                        <span
                            ref={underlineRef2}
                            className="block absolute left-0 -bottom-1 h-[2px] bg-cyan-400 w-full scale-x-0"
                            style={{
                                transformOrigin: 'right',
                                transition: 'transform 0.3s',
                            }}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}


export default Story;
