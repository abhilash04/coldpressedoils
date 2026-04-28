import api from "./api"; // Import the new axios instance

const packageJson = require("../../package.json");

export const invokeApi = async (url, params, cookies) => {
    try {
        // 'cookies' argument is now optional/ignored as the interceptor handles it
        // We use the 'api' instance which has the base URL and interceptors configured
        return await api.post(url, params);
    } catch (error) {
        // Return the error response to maintain backward compatibility with components checks
        return error.response || { status: 500, data: { responseMessage: "Network Error" } };
    }
};

export const invokePostApi = invokeApi;

export const invokePutApi = async (url, params) => {
    try {
        return await api.put(url, params);
    } catch (error) {
        return error.response || { status: 500, data: { responseMessage: "Network Error" } };
    }
};

export const invokeGetApi = async (url, params) => {
    try {
        return await api.get(url, { params: params });
    } catch (error) {
        return error.response || { status: 500, data: { responseMessage: "Network Error" } };
    }
};

export const invokeFormDataApi = async (url, formData, cookies) => {
    try {
        return await api.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    } catch (error) {
        return error.response || { status: 500, data: { responseMessage: "Network Error" } };
    }
};

export const invokeDeleteApi = async (url, params) => {
    try {
        return await api.delete(url, { data: params });
    } catch (error) {
        return error.response || { status: 500, data: { responseMessage: "Network Error" } };
    }
};

export const apiList = {
  // Authentication & Users
  signup: "/signup",
  login: "/login",
  userLogin: "/login",
  addUser: "/addUser",
  getUsers: "/getUsers",
  getUser: "/getUser",
  updateUser: "/updateUser",
  changePassword: "/changePassword",
  deleteUser: "/deleteUser",
  updateUserRoles: "/updateUserRoles",

  // Products
  featured: "/featured",
  allProducts: "/all",
  getAllProducts: "/getAllProducts",
  addProduct: "/addProduct",
  getProduct: "/getProduct",
  updateProduct: "/updateProduct",
  deleteProduct: "/deleteProduct",
  updateProductGallery: "/updateProductGallery",
  getAllCategory: "/getAllCategory",
  addCategory: "/addCategory",
  getCategory: "/getCategory",
  updateCategory: "/updateCategory",
  deleteCategory: "/deleteCategory",
  addSubCategory: "/addSubCategory",
  getAllSubCategory: "/getAllSubCategory",
  getSubCategory: "/getSubCategory",
  updateSubCategory: "/updateSubCategory",
  deleteSubCategory: "/deleteSubCategory",
  getProductByOgUrl: "/getProductByOgUrl",

  // Orders
  getAllProductOrder: "/getAllProductOrder",
  getAllOrderTrack: "/getAllOrderTrack",
  addProductOrder: "/addProductOrder",
  generateOrder: "/generateOrder",

  // Addresses
  getAllAddress: "/getAllAddress",
  addAddress: "/addAddress",
  deleteAddress: "/deleteAddress",

  // Leads
  addLead: "/addLead",
  addARGLead: "/addARGLead",
  getLeads: "/getLeads",
  updateLead: "/updateLead",

  // Blog
  addBlog: "/addBlog",
  getBlogs: "/getBlogs",
  updateBlog: "/updateBlog",
  getBlog: "/getBlog",
  approveBlog: "/approveBlog",
  deleteBlog: "/deleteBlog",
  addBlogBanner: "/addBlogBanner",
  addBlogFeaturedImage: "/addBlogFeaturedImage",
  getArticles: "/getArticles",
  getArticleByOgUrl: "/getArticleByOgUrl",

  // SEO Management
  addSite: "/addSite",
  getAllSites: "/getAllSites",
  getSite: "/getSite",
  updateSite: "/updateSite",
  addMetaData: "/addMetaData",
  getMetaDataBySite: "/getMetaDataBySite",
  updateMetaData: "/updateMetaData",
  updateSeoFaqs: "/updateSeoFaqs",

  // Location Pages
  addNewPage: "/addNewPage",
  getPage: "/getPage",
  getLocationData: "/getLocationData",
  getPages: "/getPages",
  getPageByID: "/getPageByID",
  addLocation: "/addLocation",
  getLocations: "/getLocations",
  addBannerImage: "/addBannerImage",
  addGallery: "/addGallery",
  addFeaturedImage: "/addFeaturedImage",

  // Admin Specific
  adminProducts: "/admin/products",
  adminSaveProduct: "/admin/save-product",
  adminDeleteProduct: "/admin/product", // usually appended with ID

  // Sections (Developer Tooling)
  addSection: "/addSection",
  getSections: "/getSections",

  // Track Order Alias
  trackOrder: "/track-order",
};
