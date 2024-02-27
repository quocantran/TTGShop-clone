const quantityInput = document.querySelector("#quantity");
const plusBtn = document.querySelector(".plus");
const minusBtn = document.querySelector(".minus");
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
  plusBtn.addEventListener("click", () => {
    let valueInp = quantityInput.getAttribute("value");
    if (valueInp < Max_Quantity) valueInp++;
    quantityInput.setAttribute("value", valueInp);
  });

  minusBtn.addEventListener("click", () => {
    let valueInp = quantityInput.getAttribute("value");
    if (valueInp > Min_Quantity) valueInp--;
    quantityInput.setAttribute("value", valueInp);
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
    const quantity = document.getElementById("quantity").value;

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
    setTimeout(() => {
      searchResult.style.display = "block";
    }, 200);
  });
  searchResult.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  document.addEventListener("click", () => {
    searchResult.style.display = "none";
  });
  searchInp.addEventListener("input", async (e) => {
    let value = "";
    debounce(async () => {
      let inputValue = e.target.value;
      value = inputValue;
      while (searchSuggest.firstChild) {
        searchSuggest.removeChild(searchSuggest.firstChild);
      }
      try {
        const res = await fetch("/api/suggest-product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword: value }),
        });
        const product = await res.json();

        product.map((item) => {
          const html = `
              
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

          searchSuggest.insertAdjacentHTML("beforeend", html);
        });
      } catch (err) {
        console.log(err);
      }
    }, 800);
  });
}
