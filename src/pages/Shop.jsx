import { useState } from 'react';


const mockProducts = [
  {
    id: 1,
    name: "리얼 앰플 세럼",
    description: "피부에 깊은 보습과 생기를 더하는 앰플 세럼",
    image: "https://via.placeholder.com/300x300.png?text=Sample+Product+1",
    price: 25000,
    cafe24Url: "https://tjsdn6752.cafe24.com/surl/O/9",
    category: "skincare"
  },
  {
    id: 2,
    name: "내추럴 클렌징 폼",
    description: "순하고 촉촉한 자연 유래 성분 클렌저",
    image: "https://via.placeholder.com/300x300.png?text=Sample+Product+2",
    price: 18000,
    cafe24Url: "https://tjsdn6752.cafe24.com/surl/O/10",
    category: "skincare"
  },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // 카테고리/정렬 필터링 (가볍게 직접 구현)
  let filteredProducts = mockProducts;
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }
  if (sortBy === "price_asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }
  // (최신순/인기순 등은 필요에 따라 추가)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더, 필터, 정렬 UI 동일 */}
      {/* ... */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">
                    {product.price?.toLocaleString()}원
                  </span>
                  <a
                    href={product.cafe24Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    구매하기
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;