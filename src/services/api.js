import axios from 'axios';

// 백엔드 API 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// API 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log('API 요청:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log('API 응답:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API 오류:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// 헬스 체크
export const healthApi = {
  check: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('헬스 체크 실패:', error);
      throw error;
    }
  },
};

// 제품 관련 API
export const productApi = {
  // 전체 제품 목록 조회
  getProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('제품 목록 조회 실패:', error);
      throw error;
    }
  },

  // 특정 제품 조회
  getProduct: async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('제품 상세 조회 실패:', error);
      throw error;
    }
  },

  // 카테고리별 제품 조회
  getProductsByCategory: async (category) => {
    try {
      const response = await api.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('카테고리별 제품 조회 실패:', error);
      throw error;
    }
  },
};

// 장바구니 관련 API (향후 확장)
export const cartApi = {
  // 장바구니 추가
  addToCart: async (productData) => {
    try {
      const response = await api.post('/cart', productData);
      return response.data;
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      throw error;
    }
  },

  // 장바구니 조회
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      console.error('장바구니 조회 실패:', error);
      throw error;
    }
  },
};

// 사용자 관련 API (향후 확장)
export const userApi = {
  // 로그인
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  },

  // 회원가입
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    }
  },
};

export default api;
