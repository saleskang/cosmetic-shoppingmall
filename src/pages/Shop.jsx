import { useEffect, useState } from 'react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 상품 데이터 fetch
  useEffect(() => {
    setLoading(true);
    fetch('/api/cafe24/products') // NAS 또는 Render 백엔드 주소에 맞게
      .then(res => {
        if (!res.ok) throw new Error("상품 데이터를 불러올 수 없습니다.");
        return res.json();
      })
      .then(data => {
        // Cafe24 API 구조에 따라 products 배열 꺼내기
        setProducts(data.products || data || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 카테고리/정렬 필터
  let filteredProducts = products;
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

  if (loading) return <div className="p-10 text-center">로딩 중...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 필터/정렬 등은 동일 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.product_no || product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={product.list_image || product.image || "https://via.placeholder.com/300"}
                  alt={product.product_name || product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.product_name || product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.summary_description || product.description || ""}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">
                    {(product.price ? Number(product.price) : 0).toLocaleString()}원
                  </span>
                  <a
                    href={product.detail_url || product.cafe24Url || "#"}
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
