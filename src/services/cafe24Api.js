import axios from 'axios';

// 카페24 API 설정
const CAFE24_API_BASE_URL = import.meta.env.VITE_CAFE24_API_URL || 'http://192.168.0.200:5000';
const CAFE24_API_KEY = import.meta.env.VITE_CAFE24_API_KEY;

// API 인스턴스 생성
const cafe24Api = axios.create({
  baseURL: CAFE24_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CAFE24_API_KEY}`,
  },
});

// 상품 관련 API
export const productApi = {
  // 상품 목록 조회
  getProducts: async (params = {}) => {
    try {
      const response = await cafe24Api.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('상품 목록 조회 실패:', error);
      throw error;
    }
  },

  // 상품 상세 조회
  getProduct: async (productId) => {
    try {
      const response = await cafe24Api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('상품 상세 조회 실패:', error);
      throw error;
    }
  },

  // 카테고리별 상품 조회
  getProductsByCategory: async (categoryId, params = {}) => {
    try {
      const response = await cafe24Api.get(`/categories/${categoryId}/products`, { params });
      return response.data;
    } catch (error) {
      console.error('카테고리별 상품 조회 실패:', error);
      throw error;
    }
  },
};

// 주문 관련 API
export const orderApi = {
  // 장바구니 추가
  addToCart: async (productData) => {
    try {
      const response = await cafe24Api.post('/cart', productData);
      return response.data;
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      throw error;
    }
  },

  // 장바구니 조회
  getCart: async () => {
    try {
      const response = await cafe24Api.get('/cart');
      return response.data;
    } catch (error) {
      console.error('장바구니 조회 실패:', error);
      throw error;
    }
  },
};

// 회원 관련 API
export const memberApi = {
  // 로그인
  login: async (credentials) => {
    try {
      const response = await cafe24Api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  },

  // 회원가입
  register: async (userData) => {
    try {
      const response = await cafe24Api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    }
  },
};

export default cafe24Api; 