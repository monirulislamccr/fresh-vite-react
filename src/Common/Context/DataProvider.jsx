/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [orders, setOrders] = useState(null);
  const [renderCart, setRenderCart] = useState(1);
  const [user, setUser] = useState(null);
  const [wishList, setWishList] = useState([]);
  const [wishLoading, setWishLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(categories && categories[0]);
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [sellerProducts, setSellerProducts] = useState(null);
  const [sellerProductsLoading, setSellerProductsLoading] = useState(false);
  const [pdServerError, setPdServerError] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoryServerError, setCategoryServerError] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);


  const [addresses, setAddresses] = useState([]);

  const token = localStorage.getItem("token");
  const base_url = "https://jewel4u.org/e-commerce";

  useEffect(() => {
    setProductsLoading(true);
    fetch(`${base_url}/api/products`)
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          setProductsLoading(false);
          setProducts(json);
          setPdServerError(false);
        }
      })
      .catch((error) => {
        if (error) {
          setPdServerError(true);
          setProductsLoading(false);
        }
      });
  }, []);

  // seller product get
  useEffect(() => {
    if (user && user.role === "seller") {
      setSellerProductsLoading(true);
      fetch(`${base_url}/api/seller-products?seller_id=${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json) {
            setSellerProductsLoading(false);
            setSellerProducts(json.data);
            // setPdServerError(false);
          }
        })
        .catch((error) => {
          if (error) {
            // setPdServerError(true);
            setSellerProductsLoading(false);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    setCategoriesLoading(true);
    fetch(`${base_url}/api/categories`)
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          setCategoriesLoading(false);
          setCategoryServerError(false);
          setCategories(json);
        }
      })
      .catch((error) => {
        if (error) {
          setCategoriesLoading(false);
          setCategoryServerError(true);
        }
      });
  }, []);

  useEffect(() => {
    if (user && user.role === "user") {
      setWishLoading(true);
      fetch(`${base_url}/api/wishlist?user_id=${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data?.length > 0) {
            setWishList(data);
          } else {
            setWishList([]);
          }
          setWishLoading(false);
        })
        .catch((error) => {
          // Handle errors
          setWishList([]);
          setWishLoading(false);
          console.error("Error fetching wishlist:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === "user") {
      setAddressLoading(true);
      fetch(`${base_url}/api/address?user_id=${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            console.log(data);
          if (data?.length > 0) {
            setAddressLoading(false);
            setAddresses(data);
          } else {
            setAddressLoading(false);
            setAddresses([]);
          }
        })
        .catch((error) => {
          setAddressLoading(false);
          setAddresses([]);
          console.error("Error fetching data:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === "user") {
      fetch(`${base_url}/api/myorders?user_id=${user?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            console.log(data);
          if (data?.length > 0) {
            setOrders(data);
          } else {
            setOrders([]);
          }
        })
        .catch((error) => {
          // Handle errors
          setOrders([]);
          console.error("Error fetching Orders:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (cart.length === 0) {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(cartItems);
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    const getUser = async () => {
      await fetch(`${base_url}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json) {
            setUser(json);
            setLoading(false);
          } else {
            setUser(null);
            localStorage.removeItem("token");
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error) {
            setLoading(false);
            setUser(null);
          }
        });
    };

    if (token) {
      getUser();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const value = {
    loading,
    user,
    setUser,
    cart,
    setCart,
    products,
    setProducts,
    wishList,
    setWishList,
    renderCart,
    setRenderCart,
    categories,
    category,
    setCategory,
    addresses,
    setAddresses,
    orders,
    setOrders,
    base_url,
    token,
    active,
    setActive,
    addressLoading,
    productsLoading,
    setProductsLoading,
    sellerProducts,
    setSellerProducts,
    sellerProductsLoading,
    setSellerProductsLoading,
    wishLoading,
    pdServerError,
    categoriesLoading,
    categoryServerError,
    headerHeight,
    setHeaderHeight,
    footerHeight,
    setFooterHeight
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
