import React, { useState, useEffect } from "react";
import PostCard from "../Components/PostCard";
import axios from "axios";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setClose } from "../Store/CartSlice";
import { MdCancel } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Home = () => {
  const cart = useSelector((state) => state.cart);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("default");
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    const res = await axios.get("https://dummyjson.com/products?limit=100");
    setData(res.data.products);
    setOriginalData(res.data.products);
    setLoading(false);
  };

  const searchItem = async () => {
    if (search === "") return getData();
    const res = await axios.get(
      `https://dummyjson.com/products/search?q=${search}`
    );
    setData(res.data.products);
  };

  const addCartItem = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, Qty: cartItem.Qty + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, Qty: 1 }]);
    }
  };

  const incrementQty = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, Qty: cartItem.Qty + 1 } : cartItem
      )
    );
  };

  const decrementQty = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.id === itemId && cartItem.Qty > 1
          ? { ...cartItem, Qty: cartItem.Qty - 1 }
          : cartItem
      )
    );
  };

  const deleteCartItem = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((cartItem) => cartItem.id !== itemId)
    );
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.Qty,
      0
    );
  };

  const applyFilters = () => {
    let filteredData = [...data];

    if (selectedFilter === "lowToHigh") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === "highToLow") {
      filteredData.sort((a, b) => b.price - a.price);
    }

    setData(filteredData);
  };

  const resetToDefault = () => {
    setData(originalData);
    setSelectedFilter("default");
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    searchItem();
  }, [search]);

  useEffect(() => {
    if (selectedFilter === "default") {
      resetToDefault();
    } else {
      applyFilters();
    }
  }, [selectedFilter, originalData]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="flex relative">
      <span
        className={`absolute top-5 z-50 text-3xl p-3 cursor-pointer ${
          cart.cartOpen ? "hidden" : "false"
        }   bg-gray-500 rounded-full text-white right-5`}
      >
        <FaCartShopping
          className=" "
          onClick={() => {
            dispatch(setOpen());
          }}
        />
      </span>

      <div className="max-w-[20%] w-full flex flex-col items-center border-r border-black mr-2">
        <input
          type="text"
          className="rounded-3xl h-10 px-3 my-3 outline-none border border-gray-500 text-gray-700"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div>
          <p>Filter</p>
          <ul>
            <li>
              <input
                type="radio"
                name="filter"
                id="default"
                checked={selectedFilter === "default"}
                onChange={() => handleFilterChange("default")}
              />
              <label htmlFor="default">Default</label>
            </li>
            <li>
              <input
                type="radio"
                name="filter"
                id="lowToHigh"
                checked={selectedFilter === "lowToHigh"}
                onChange={() => handleFilterChange("lowToHigh")}
              />
              <label htmlFor="lowToHigh">Price Low to High</label>
            </li>
            <li>
              <input
                type="radio"
                name="filter"
                id="highToLow"
                checked={selectedFilter === "highToLow"}
                onChange={() => handleFilterChange("highToLow")}
              />
              <label htmlFor="highToLow">Price High to Low</label>
            </li>
          </ul>
        </div>
        <button className="absolute bottom-5 left-20 px-5 py-3 bg-blue-600 text-white text-xl font-bold mt-5 rounded-full">Log Out</button>
      </div>
      <div className="max-w-[80%] w-full grid grid-cols-3 gap-5 overflow-y-scroll max-h-[100vh] justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          data.map((item) => (
            <PostCard
              key={item.id}
              item={item}
              onAddToCart={() => addCartItem(item)}
            />
          ))
        )}
      </div>
      <div
        className={`max-w-[30%] w-full ${
          cart.cartOpen ? "block" : "hidden"
        } absolute right-0 bg-white min-h-[100vh] border border-black px-5`}
      >
        <div className="flex justify-between items-center px-5 py-3 border-b border-gray-300">
          <p className="text-2xl font-bold">Cart</p>
          <MdCancel
            className="text-2xl cursor-pointer"
            onClick={() => {
              dispatch(setClose());
            }}
          />
        </div>
        <div className=" py-3 border-b border-gray-300 max-h-[60vh] overflow-y-scroll">
          <p className="text-xl font-bold">Items</p>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mt-2">
              <p className="max-w-[40%] w-[40%]">{item.title}</p>
              <div className="max-w-[30%] w-[30%] flex items-center justify-center">
                <button
                  className="px-2 py-1 bg-blue-600 text-white rounded-full font-bold mr-2"
                  onClick={() => decrementQty(item.id)}
                >
                  -
                </button>
                <span>{item.Qty}</span>
                <button
                  className="px-2 py-1 bg-blue-600 text-white rounded-full font-bold ml-2"
                  onClick={() => incrementQty(item.id)}
                >
                  +
                </button>
              </div>
              <p className="max-w-[15%] w-[15%] text-center">$ {item.price * item.Qty}</p>
              <button
                className="max-w-[15%] w-[15%] flex items-center justify-center"
                onClick={() => deleteCartItem(item.id)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-b border-gray-300">
          <p className="text-xl font-bold">Total</p>
          <div className="flex justify-between items-center">
            <p>Total</p>
            <p>${calculateTotalAmount()}</p>
          </div>
        </div>
        <button className="px-5 py-3 bg-blue-600 text-white text-xl font-bold mt-5 rounded-full">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Home;
