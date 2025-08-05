function Footer() {
  return (
    <footer className="bg-[#f8f6ef] pt-12 pb-6 px-8 ">
      <div className="w-full">
        <div className="flex flex-wrap gap-12 justify-between mb-8 mx-auto">

          <div className="min-w-[240px]">
            <div className="text-green-900 text-xl font-medium mb-2">Customer Center</div>
            <div className="text-[2.5rem] font-light text-green-900 leading-tight mb-1">1600-3689</div>
            <div className="text-green-900 text-sm mb-2">Mon-Fri 10:00 - 17:00</div>
          </div>
          {/* 주문 및 문의 */}
          <div className="flex gap-12">
            <div className="font-semibold text-green-900 mb-2">주문 및 문의</div>
            <ul className="text-green-900 text-sm space-y-1">
              <li>주문조회</li>
              <li>문의하기</li>
              <li>자주하는질문</li>
              <li>제품리뷰</li>
            </ul>
          </div>
          {/* 소셜미디어 */}
          <div>
            <div className="font-semibold text-green-900 mb-2">소셜미디어</div>
            <ul className="text-green-900 text-sm space-y-1">
              <li>인스타그램</li>
              <li>유튜브</li>
              <li>틱톡</li>
            </ul>
          </div>
          {/* B2B */}
          <div>
            <div className="font-semibold text-green-900 mb-2">B2B</div>
            <ul className="text-green-900 text-sm space-y-1">
              <li>대량주문</li>
              <li>주요 연락처</li>
            </ul>
          </div>
          {/* 인재채용 */}
          <div>
            <div className="font-semibold text-green-900 mb-2">인재채용</div>
            <ul className="text-green-900 text-sm space-y-1">
              <li>조직문화</li>
              <li>채용공고</li>
            </ul>
          </div>
        </div>
        <div className="w-full text-center py-12 mx-auto">
          <span
            className="text-[8vw] md:text-[6vw] font-extrabold tracking-widest text-green-900 leading-none"
            style={{ letterSpacing: "0.12em" }}
          >
            GSLAND
          </span>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between border-t border-green-200 pt-4 text-green-900 text-sm gap-1">
          <span>(주) 지에스랜드</span>
          <span>© 2025 GSLAND All rights reserved. In God we trust.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
