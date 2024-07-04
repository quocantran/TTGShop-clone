const quantityInput = document.querySelector(".quantity");
const plusBtn = document.querySelectorAll(".plus");
const minusBtn = document.querySelectorAll(".minus");
const modalLive = document.querySelector(".modalLive-wrapper");
const closeLive = document.querySelector(".close-live");
const openLive = document.querySelector(".review-container");
const loadMoreBtn = document.querySelector(".more-product");
const accountTitle = document.querySelector(".account-title");
const accountContent = document.querySelector(".account-content");
const forgotPasswordBtn = document.querySelector(".form-navigate");
const loginForm = document.querySelector(".form-login");
const backFormBtn = document.querySelector(".form-back");
const forgotForm = document.querySelector(".form-forgot");
const actionHeader = document.querySelector(".action-container");
const headerUsername = document.querySelector(".user-name");
const headerAccount = document.querySelector(".header-account");
const logoutBtn = document.querySelectorAll(".log-out");
const addToCart = document.querySelector("#add-to-cart");
const searchInp = document.querySelector(".search-input");
const totalPriceProduct = document.querySelectorAll(".total-price-product");
const showProduct = document.querySelectorAll(".show-product");
const productInfo = document.querySelector(".productInfo-inner");
const productWrapper = document.querySelector(".product-info-wrapper");
const buttonsAddToCart = document.querySelectorAll(".product-action-inner");

const Max_Quantity = 10;
const Min_Quantity = 1;

const cookies = document.cookie;

const cookieArray = cookies
  .split(";")
  .map((cookie) => cookie.trim().split("="));

const usernameCookie = cookieArray.find((cookie) => cookie[0] === "username");

const username = usernameCookie ? decodeURIComponent(usernameCookie[1]) : null;

if (username) {
  accountTitle.innerHTML = "Tài khoản của";
  accountContent.innerHTML = username;

  actionHeader.removeAttribute("href");
  actionHeader.addEventListener("click", () => {
    headerAccount.classList.toggle("js-show");
  });
}

if (headerUsername) {
  headerUsername.innerHTML = username;
}

if (quantityInput) {
  plusBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let valueInp = quantityInput.getAttribute("value");
      if (valueInp < Max_Quantity) valueInp++;
      quantityInput.setAttribute("value", valueInp);
    });
  });

  minusBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let valueInp = quantityInput.getAttribute("value");
      if (valueInp > Min_Quantity) valueInp--;
      quantityInput.setAttribute("value", valueInp);
    });
  });
}

openLive.addEventListener("click", () => {
  modalLive.classList.toggle("open");
});

if (closeLive) {
  closeLive.addEventListener("click", () => {
    modalLive.classList.toggle("open");
  });
}

if (forgotPasswordBtn) {
  forgotPasswordBtn.addEventListener("click", () => {
    forgotForm.style.display = "block";
    loginForm.style.display = "none";
  });
}
if (backFormBtn) {
  backFormBtn.addEventListener("click", () => {
    forgotForm.style.display = "none";
    loginForm.style.display = "block";
  });
}

if (logoutBtn) {
  for (const item of logoutBtn) {
    item.addEventListener("click", () => {
      document.cookie.split(";").forEach(function (cookie) {
        let cookieName = cookie.split("=")[0].trim();
        document.cookie =
          cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      });
      window.location.reload();
    });
  }
}

if (addToCart) {
  addToCart.addEventListener("click", function () {
    const quantity = document.querySelector(".quantity").value;

    const form = document.querySelector(".productDetail-actions");
    const action = form.getAttribute("action");
    form.setAttribute("action", `${action}?quantity=${quantity}`);

    form.submit();
  });
}

if (totalPriceProduct) {
  for (const item of totalPriceProduct) {
    let text = item.textContent;
    let totalPrice = parseFloat(text);

    if (!isNaN(totalPrice)) {
      let formattedPrice = totalPrice.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      formattedPrice = formattedPrice
        .replace(/\u00a0₫/gi, "₫")
        .replace(/\./g, ",");
      item.textContent = formattedPrice;
    }
  }
}

if (searchInp) {
  const searchResult = document.querySelector(".search-result");
  const searchSuggest = document.querySelector(".search-suggest");
  const searchTitle = document.querySelector(".search-title");
  let timeoutId;
  function debounce(func, delay) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  }
  searchInp.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  searchInp.addEventListener("focus", (e) => {
    e.stopPropagation();

    searchResult.style.display = "block";
    setTimeout(() => {
      searchTitle.classList.add("title-show");
    }, 100);
  });
  searchResult.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  document.addEventListener("click", () => {
    searchResult.style.display = "none";
    searchTitle.classList.remove("title-show");
  });
  searchInp.addEventListener("input", async (e) => {
    let value = "";
    debounce(async () => {
      let inputValue = e.target.value;
      value = inputValue;
      try {
        const res = await fetch("/api/suggest-product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword: value }),
        });
        const product = await res.json();

        const result = product.map((item) => {
          return `
              
              <div class="search-item">
                  <div class="search-info"> 
                      <a href="/products/${item.slug}" class="searchInfo-title">${item.title}</a>
                      <p>${item.price}</p>
                  </div>
                  <div class="search-thumb"> 
                      <a href="/products/${item.slug}">
                          <img src="${item.image_url}" alt="icon" srcset="">
                      </a>
                  </div> 
              </div>
          `;
        });

        searchSuggest.innerHTML = result.join("");
      } catch (err) {
        console.log(err);
      }
    }, 500);
  });
}

if (showProduct) {
  showProduct.forEach((item) => {
    item.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = item.getAttribute("data-id");

      const data = await fetch(`/api/product/${id}`);
      const product = await data.json();

      const html = `
              <div class="productInfo-thumb">
                <img src= ${product.image_url} alt="" srcset="">
              </div>
              <div class="productDetail-content">
                <div class="productDetail-header">
                  <h1>${product.title}</h1>
                  <span class="product-soldout">Tình trạng :</span>
                  <p class="${product.sold_out ? "sold-out" : "stocking"}">${product.sold_out ? "Hết hàng" : "Còn hàng"}</p>
                </div>
                <div class="productDetail-inner">
                  <div class="productInner-wrapper">
                    <div class="productDetail-price">
                      <span>Giá:</span>
                      <p>${product.price}</p>
                      <div class="${product.discount === "" ? "" : "productDetail-discount"}">
                        <h3>${product.discount === "" ? "" : product.discount}</h3>
                      </div>
                    </div>
                    <form action="/add-to-cart/${product._id}" method="post" class="productDetail-actions">
                      <div class="addcart-area">
                        <div class="buy-now">
                          <form action="/add-to-cart/${product._id}" method="POST" class="add-form">
                            <input name="cart" hidden>
                            <button type="submit">mua ngay</button>
                          </form>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="productInfo-close">
                <i class="fa-solid fa-xmark"></i>
              </div>
      `;
      productInfo.innerHTML = html;
      productWrapper.style.position = "fixed";
      productWrapper.style.opacity = "1";
      const closeModal = document.querySelector(".productInfo-close");
      if (closeModal) {
        closeModal.addEventListener("click", () => {
          productWrapper.style.position = "relative";
          productWrapper.style.opacity = "0";
        });
      }
    });
  });
}

if (productWrapper) {
  productWrapper.addEventListener("click", () => {
    productWrapper.style.position = "relative";
    productWrapper.style.opacity = "0";
  });
  productInfo.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

if (buttonsAddToCart) {
  buttonsAddToCart.forEach((item) => {
    item.addEventListener("click", (e) => {
      item.style.pointerEvents = "none";
    });
  });
}
