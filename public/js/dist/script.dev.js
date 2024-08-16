"use strict";

var quantityInput = document.querySelector(".quantity");
var plusBtn = document.querySelectorAll(".plus");
var minusBtn = document.querySelectorAll(".minus");
var modalLive = document.querySelector(".modalLive-wrapper");
var closeLive = document.querySelector(".close-live");
var openLive = document.querySelector(".review-container");
var loadMoreBtn = document.querySelector(".more-product");
var accountTitle = document.querySelector(".account-title");
var accountContent = document.querySelector(".account-content");
var forgotPasswordBtn = document.querySelector(".form-navigate");
var loginForm = document.querySelector(".form-login");
var backFormBtn = document.querySelector(".form-back");
var forgotForm = document.querySelector(".form-forgot");
var actionHeader = document.querySelector(".action-container");
var headerUsername = document.querySelector(".user-name");
var headerAccount = document.querySelector(".header-account");
var logoutBtn = document.querySelectorAll(".log-out");
var addToCart = document.querySelector("#add-to-cart");
var searchInp = document.querySelector(".search-input");
var totalPriceProduct = document.querySelectorAll(".total-price-product");
var showProduct = document.querySelectorAll(".show-product");
var productInfo = document.querySelector(".productInfo-inner");
var productWrapper = document.querySelector(".product-info-wrapper");
var buttonsAddToCart = document.querySelectorAll(".product-action-inner");
var buyNowBtn = document.querySelector(".buy-now");
var Max_Quantity = 10;
var Min_Quantity = 1;
var cookies = document.cookie;
var cookieArray = cookies.split(";").map(function (cookie) {
  return cookie.trim().split("=");
});
var usernameCookie = cookieArray.find(function (cookie) {
  return cookie[0] === "username";
});
var username = usernameCookie ? decodeURIComponent(usernameCookie[1]) : null;

if (username) {
  accountTitle.innerHTML = "Tài khoản của";
  accountContent.innerHTML = username;
  actionHeader.removeAttribute("href");
  actionHeader.addEventListener("click", function () {
    headerAccount.classList.toggle("js-show");
  });
}

if (headerUsername) {
  headerUsername.innerHTML = username;
}

if (quantityInput) {
  plusBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var valueInp = quantityInput.getAttribute("value");
      if (valueInp < Max_Quantity) valueInp++;
      quantityInput.setAttribute("value", valueInp);
    });
  });
  minusBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var valueInp = quantityInput.getAttribute("value");
      if (valueInp > Min_Quantity) valueInp--;
      quantityInput.setAttribute("value", valueInp);
    });
  });
}

openLive.addEventListener("click", function () {
  modalLive.classList.toggle("open");
});

if (closeLive) {
  closeLive.addEventListener("click", function () {
    modalLive.classList.toggle("open");
  });
}

if (forgotPasswordBtn) {
  forgotPasswordBtn.addEventListener("click", function () {
    forgotForm.style.display = "block";
    loginForm.style.display = "none";
  });
}

if (backFormBtn) {
  backFormBtn.addEventListener("click", function () {
    forgotForm.style.display = "none";
    loginForm.style.display = "block";
  });
}

if (logoutBtn) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = logoutBtn[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      item.addEventListener("click", function () {
        document.cookie.split(";").forEach(function (cookie) {
          var cookieName = cookie.split("=")[0].trim();
          document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });
        window.location.reload();
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

if (addToCart) {
  addToCart.addEventListener("click", function () {
    this.style.pointerEvents = "none";
    var quantity = document.querySelector(".quantity").value;
    var form = document.querySelector(".productDetail-actions");
    var action = form.getAttribute("action");
    form.setAttribute("action", "".concat(action, "?quantity=").concat(quantity));
    form.submit();
  });
}

if (buyNowBtn) {
  buyNowBtn.addEventListener("click", function () {
    this.style.pointerEvents = "none";
  });
}

if (totalPriceProduct) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = totalPriceProduct[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _item = _step2.value;
      var text = _item.textContent;
      var totalPrice = parseFloat(text);

      if (!isNaN(totalPrice)) {
        var formattedPrice = totalPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND"
        });
        formattedPrice = formattedPrice.replace(/\u00a0₫/gi, "₫").replace(/\./g, ",");
        _item.textContent = formattedPrice;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

if (searchInp) {
  var debounce = function debounce(func, delay) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };

  var searchResult = document.querySelector(".search-result");
  var searchSuggest = document.querySelector(".search-suggest");
  var searchTitle = document.querySelector(".search-title");
  var timeoutId;
  searchInp.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  searchInp.addEventListener("focus", function (e) {
    e.stopPropagation();
    searchResult.style.display = "block";
    setTimeout(function () {
      searchTitle.classList.add("title-show");
    }, 100);
  });
  searchResult.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  document.addEventListener("click", function () {
    searchResult.style.display = "none";
    searchTitle.classList.remove("title-show");
  });
  searchInp.addEventListener("input", function _callee2(e) {
    var value;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            value = "";
            debounce(function _callee() {
              var inputValue, res, product, result;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      inputValue = e.target.value;
                      value = inputValue;
                      _context.prev = 2;
                      _context.next = 5;
                      return regeneratorRuntime.awrap(fetch("/api/suggest-product", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          keyword: value
                        })
                      }));

                    case 5:
                      res = _context.sent;
                      _context.next = 8;
                      return regeneratorRuntime.awrap(res.json());

                    case 8:
                      product = _context.sent;
                      result = product.map(function (item) {
                        return "\n              \n              <div class=\"search-item\">\n                  <div class=\"search-info\"> \n                      <a href=\"/products/".concat(item.slug, "\" class=\"searchInfo-title\">").concat(item.title, "</a>\n                      <p>").concat(item.price, "</p>\n                  </div>\n                  <div class=\"search-thumb\"> \n                      <a href=\"/products/").concat(item.slug, "\">\n                          <img src=\"").concat(item.image_url, "\" alt=\"icon\" srcset=\"\">\n                      </a>\n                  </div> \n              </div>\n          ");
                      });
                      searchSuggest.innerHTML = result.join("");
                      _context.next = 16;
                      break;

                    case 13:
                      _context.prev = 13;
                      _context.t0 = _context["catch"](2);
                      console.log(_context.t0);

                    case 16:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[2, 13]]);
            }, 500);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
}

if (showProduct) {
  showProduct.forEach(function (item) {
    item.addEventListener("click", function _callee3(e) {
      var id, data, product, html, closeModal;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              e.preventDefault();
              id = item.getAttribute("data-id");
              _context3.next = 4;
              return regeneratorRuntime.awrap(fetch("/api/product/".concat(id)));

            case 4:
              data = _context3.sent;
              _context3.next = 7;
              return regeneratorRuntime.awrap(data.json());

            case 7:
              product = _context3.sent;
              html = "\n              <div class=\"productInfo-thumb\">\n                <img src= ".concat(product.image_url, " alt=\"\" srcset=\"\">\n              </div>\n              <div class=\"productDetail-content\">\n                <div class=\"productDetail-header\">\n                  <h1>").concat(product.title, "</h1>\n                  <span class=\"product-soldout\">T\xECnh tr\u1EA1ng :</span>\n                  <p class=\"").concat(product.sold_out ? "sold-out" : "stocking", "\">").concat(product.sold_out ? "Hết hàng" : "Còn hàng", "</p>\n                </div>\n                <div class=\"productDetail-inner\">\n                  <div class=\"productInner-wrapper\">\n                    <div class=\"productDetail-price\">\n                      <span>Gi\xE1:</span>\n                      <p>").concat(product.price, "</p>\n                      <div class=\"").concat(product.discount === "" ? "" : "productDetail-discount", "\">\n                        <h3>").concat(product.discount === "" ? "" : product.discount, "</h3>\n                      </div>\n                    </div>\n                    <form action=\"/add-to-cart/").concat(product._id, "\" method=\"post\" class=\"productDetail-actions\">\n                      <div class=\"addcart-area\">\n                        <div class=\"buy-now\">\n                          <form action=\"/add-to-cart/").concat(product._id, "\" method=\"POST\" class=\"add-form\">\n                            <input name=\"cart\" hidden>\n                            <button type=\"submit\">mua ngay</button>\n                          </form>\n                        </div>\n                      </div>\n                    </form>\n                  </div>\n                </div>\n              </div>\n              <div class=\"productInfo-close\">\n                <i class=\"fa-solid fa-xmark\"></i>\n              </div>\n      ");
              productInfo.innerHTML = html;
              productWrapper.style.position = "fixed";
              productWrapper.style.opacity = "1";
              closeModal = document.querySelector(".productInfo-close");

              if (closeModal) {
                closeModal.addEventListener("click", function () {
                  productWrapper.style.position = "relative";
                  productWrapper.style.opacity = "0";
                });
              }

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
  });
}

if (productWrapper) {
  productWrapper.addEventListener("click", function () {
    productWrapper.style.position = "relative";
    productWrapper.style.opacity = "0";
  });
  productInfo.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}

if (buttonsAddToCart) {
  buttonsAddToCart.forEach(function (item) {
    item.addEventListener("click", function (e) {
      item.style.pointerEvents = "none";
    });
  });
}