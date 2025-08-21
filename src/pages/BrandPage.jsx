export default function BrandPage() {
  return (
    <main className="bg-white">
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* 두 칸을 정확히 반반 */}
        <div className="flex flex-row items-stretch gap-0">
          {/* 왼쪽: 텍스트 영역 = 50% (내용 패딩은 내부 래퍼에서 처리) */}
          <div className="basis-1/2 grow-0 shrink-0 relative">
            <div className="flex flex-col gap-6 h-full pb-8 relative" style={{ minHeight: "400px" }}>
              <h1 className="text-5xl md:text-6xl font-serif leading-tight tracking-tight">
                SEA & SAND<br/>ESSENTIALS
              </h1>

                                         <div className="text-gray-700 leading-7">
                        <p className="mb-2">
                          From us to you: A curation of seasonal essentials,<br/>
                          perfectly suited for sun-drenched getaways.
                        </p>
                        <p className="mb-2">
                          Enjoy a 4-piece mini regimen of La Mer heroes<br/>
                          plus an emerald beauty bag with any eligible $375 purchase.
                        </p>
                        <p className="mb-2">
                          Add a luxury mini of The Moisturizing Soft Cream<br/>
                          with any eligible $500 purchase.
                        </p>
                        <p>
                          Enter code: <strong>SUMMERHEROES</strong>
                        </p>
                      </div>

              <a href="#" className="inline-block w-fit underline underline-offset-4 font-medium">
                Shop now
              </a>

              <div className="absolute left-0 bottom-0 text-[12vw] md:text-[8rem] leading-none font-serif tracking-tight">
                LA MER
              </div>
            </div>
          </div>

          {/* 오른쪽: 이미지 영역 = 50% */}
          <div className="basis-1/2 grow-0 shrink-0">
            <img
              src="/assets/img/1.jpg"
              alt="Brand hero"
              className="block w-full h-auto object-cover"
              width="1600"
              height="1200"
              fetchpriority="high"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
