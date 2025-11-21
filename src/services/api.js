/**
 * API Service for FakeStoreAPI Integration
 * Handles all product data fetching and transformations
 */

const API_BASE_URL = "https://fakestoreapi.com";

/**
 * Map FakeStoreAPI categories to project categories
 */
const mapCategory = (apiCategory) => {
  const categoryMap = {
    electronics: "Electronics",
    jewelery: "Jewelry",
    "men's clothing": "Men's Clothing",
    "women's clothing": "Women's Clothing",
  };
  return categoryMap[apiCategory] || apiCategory;
};

/**
 * Fetch all products from FakeStoreAPI
 * @returns {Promise<Array>} Array of products
 */
export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Product not found: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch products by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of products in category
 */
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${category}`
    );
    if (!response.ok) {
      throw new Error(`Category not found: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching category ${category}:`, error);
    throw error;
  }
};

/**
 * Fetch all available categories
 * @returns {Promise<Array>} Array of category names
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

/**
 * Search products by title (local search on all products)
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching products
 */
export const searchProducts = async (query) => {
  try {
    const allProducts = await fetchAllProducts();
    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

/**
 * Get fallback image based on product ID
 * Uses a rotation of common product images
 * @param {number} id - Product ID
 * @returns {string} Fallback image - will be handled by ProductCard error handling
 */
const getFallbackImage = (id) => {
  // Return the API product image URL - if it fails, ProductCard will handle it
  return `https://via.placeholder.com/300x300/CCCCCC/999999?text=Product+${id}`;
};

/**
 * Transform API product to app format
 * Adds additional fields for UI compatibility
 * @param {Object} apiProduct - Product from FakeStoreAPI
 * @returns {Object} Transformed product object
 */
export const transformProduct = (apiProduct) => {
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    price: apiProduct.price,
    image: apiProduct.image || getFallbackImage(apiProduct.id),
    category: mapCategory(apiProduct.category),
    description: apiProduct.description,
    rating: apiProduct.rating?.rate || 0,
    ratingCount: apiProduct.rating?.count || 0,
    isNew: Math.random() > 0.5, // Mock new status
    isHot: Math.random() > 0.7, // Mock hot status
  };
};

const apiService = {
  fetchAllProducts,
  fetchProductById,
  fetchProductsByCategory,
  fetchCategories,
  searchProducts,
  transformProduct,
};

export default apiService;
