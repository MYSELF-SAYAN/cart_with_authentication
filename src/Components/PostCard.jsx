import React from "react";

const PostCard = ({ item, onAddToCart }) => {
  const { title, price, thumbnail, description } = item;

  const itemToAdd = {
    Qty: 1,
    title,
    price,
    
  };

  return (
    <div className="max-w-[40rem] max-h-[35rem] min-h-[35rem] mt-5 border border-black rounded-2xl p-2 relative">
      <img
        src={thumbnail}
        alt=""
        className="max-h-[50%] h-[50%] object-cover overflow-hidden w-full mb-3"
      />
      <p className="text-xl font-bold px-5 pt-3 border-t border-t-black">{title}</p>
      <p className="text-sm px-5 pt-3">{description}</p>
      <p className="px-5 pt-3 text-lg font-semibold">$ {price}</p>
      <button
        className="px-5 py-3 text-xl bg-blue-600 text-white rounded-full font-bold absolute bottom-5"
        onClick={() => {
          onAddToCart(itemToAdd);
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default PostCard;
