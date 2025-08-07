import express from 'express';
import axios from 'axios';

const router = express.Router();

// 헬스 체크
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Cosmetics site API is running',
    timestamp: new Date().toISOString()
  });
});

// 제품 목록 조회
router.get('/products', async (req, res) => {
  try {
    // 임시 제품 데이터
    const products = [
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
      },
      {
        id: 3,
        name: 'Anti-Aging Cream',
        description: '노화 방지 크림',
        price: 45000,
        image: '/assets/img/4.jpg',
        category: 'anti-aging'
      }
    ];
    
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '제품 목록을 불러오는 중 오류가 발생했습니다.',
      error: error.message
    });
  }
});

// 특정 제품 조회
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // 임시 제품 데이터
    const products = [
      {
        id: 1,
        name: 'Natural Face Cream',
        description: '자연스러운 보습 효과',
        price: 25000,
        image: '/assets/img/1.jpg',
        category: 'skincare',
        ingredients: ['알로에', '시카', '히알루론산'],
        size: '50ml'
      },
      {
        id: 2,
        name: 'Organic Serum',
        description: '유기농 성분으로 만든 세럼',
        price: 35000,
        image: '/assets/img/2.jpg',
        category: 'skincare',
        ingredients: ['비타민C', '나이아신아마이드', '펩타이드'],
        size: '30ml'
      }
    ];
    
    const product = products.find(p => p.id === parseInt(id));
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: '제품을 찾을 수 없습니다.'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '제품 정보를 불러오는 중 오류가 발생했습니다.',
      error: error.message
    });
  }
});

// 카테고리별 제품 조회
router.get('/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const products = [
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
      },
      {
        id: 3,
        name: 'Anti-Aging Cream',
        description: '노화 방지 크림',
        price: 45000,
        image: '/assets/img/4.jpg',
        category: 'anti-aging'
      }
    ];
    
    const filteredProducts = products.filter(p => p.category === category);
    
    res.json({
      success: true,
      data: filteredProducts,
      count: filteredProducts.length,
      category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '카테고리별 제품을 불러오는 중 오류가 발생했습니다.',
      error: error.message
    });
  }
});

export default router;
