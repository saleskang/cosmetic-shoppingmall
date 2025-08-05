import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../services/cafe24Api';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // 상품 목록 조회
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', selectedCategory, sortBy],
    queryFn: () => productApi.getProducts({ 
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      sort: sortBy 
    }),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">상품을 불러오는데 실패했습니다</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 섹션 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop</h1>
          <p className="text-lg text-gray-600">최고의 제품들을 만나보세요</p>
        </div>
      </div>

      {/* 필터 및 정렬 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* 카테고리 필터 */}
          <div className="flex gap-2">
            {['all', 'skincare', 'makeup', 'bodycare'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? '전체' : 
                 category === 'skincare' ? '스킨케어' :
                 category === 'makeup' ? '메이크업' : '바디케어'}
              </button>
            ))}
          </div>

          {/* 정렬 */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="newest">최신순</option>
            <option value="price_asc">가격 낮은순</option>
            <option value="price_desc">가격 높은순</option>
            <option value="popular">인기순</option>
          </select>
        </div>
      </div>

      {/* 상품 그리드 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">
                    {product.price?.toLocaleString()}원
                  </span>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                    장바구니
                  </button>
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