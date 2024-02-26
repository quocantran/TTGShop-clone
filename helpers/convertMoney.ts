function formatPrice(price: number) {
  let formattedPrice = price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formattedPrice.replace(/\u00a0₫/gi, "₫");
}

export default formatPrice;
