
window.addEventListener("DOMContentLoaded", () => {


  // server JSON
  const loadContent = async (url, callback) => {
    await fetch(url)
      .then(response => response.json())  //promise
      .then(json => createElement(json.goods));
      
  callback();    
  }

  function createElement(arr) {
      const goodsWrapper = document.querySelector('.goods__wrapper');

      arr.forEach(function(item) {
          let card = document.createElement('div');
          card.classList.add('goods__item');
          card.innerHTML = `
              <img class="goods__img" src="${item.url}" alt="phone">
              <div class="goods__colors">Доступно цветов: 4</div>
              <div class="goods__title">
                   ${item.title}
              </div>
              <div class="goods__price">
                  <span>${item.price}</span> руб/шт
              </div>
              <button class="goods__btn">Добавить в корзину</button>
          `;
        goodsWrapper.appendChild(card)<3;
      });
  }

  loadContent('js/db.json', () => {
    const cartWrapper = document.querySelector(".cart__wrapper"),
    cart = document.querySelector(".cart"),
    close = document.querySelector(".cart__close"),
    open = document.querySelector("#cart"),
    goodsBtn = document.querySelectorAll(".goods__btn"),
    products = document.querySelectorAll(".goods__item"),
    confirm = document.querySelector(".confirm"),
    badge = document.querySelector(".nav__badge"),
    totalCost = document.querySelector(".cart__total > span"),
    titles = document.querySelectorAll(".goods__title");

    //open modal
    function openCart() {
      cart.style.display = "block";
      document.body.style.overflow = "hidden";
    }
    //close modal
    function closeCart() {
      cart.style.display = "none";
      document.body.style.overflow = "";
    }

// open.addEventListener('click', function(){
//     openCart()
// });
// ES6
// open.addEventListener('click', () => {
//     openCart()
// });

  open.addEventListener("click", openCart);
  close.addEventListener("click", closeCart);

  goodsBtn.forEach(function (btn, i) {
    btn.addEventListener("click", () => {
      let item = products[i].cloneNode(true), //copyProduct
        trigger = item.querySelector("button"), //tegButton
        removeBtn = document.createElement("div"),
        empty = cartWrapper.querySelector(".empty");

    trigger.remove(); //removeButton

    showConfirm(); //showConfirmAnimation

    removeBtn.classList.add("goods__item-remove"); //addClass
    removeBtn.innerHTML = "&times"; //closingProduct
    item.appendChild(removeBtn);

    cartWrapper.appendChild(item);
    if (empty) {
      empty.style.display = 'none';
      //remove()
    }

    calcGoods(); //quantityCart
    calcTotal(); //countsAmount
    removeFromCart(); //

  });
});

  //cutOffTitles
  function sliceTitle() {
    titles.forEach(function (item) {
      if (item.textContent.length < 70) {
        return;
      } else {
        const str = item.textContent.slice(0, 70) + "...";
        // const str = `${item.textContent.slice(0, 71)} ...`;ES6
        item.textContent = str;
      }
    });
  }
  sliceTitle();

  //showConfirm
  function showConfirm() {
    confirm.style.display = "block";
    let counter = 100;
    const id = setInterval(frame, 10);

  //animationBasket
  function frame() {
    if (counter == 10) {
      clearInterval(id);
      confirm.style.display = "none";
    } else {
      counter--;
      confirm.style.opacity = "." + counter;
      confirm.style.transform = `translateY(-${counter}px)`;
    }
  }
}


  //quantityCart
  function calcGoods() {
    const items = cartWrapper.querySelectorAll(".goods__item");
    badge.textContent = items.length; 
    // i +
  }


  //countsAmount
  function calcTotal() {
    const prices = document.querySelectorAll(
      ".cart__wrapper > .goods__item > .goods__price > span"
      );
    let total = 0;
    prices.forEach(function (item) {
      total += +item.textContent;
    });
    totalCost.textContent = total;
  }


  //removeFromCart
  function removeFromCart() {
    const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
      removeBtn.forEach(function (btn) {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            calcGoods();
            calcTotal();

            if (cartWrapper.querySelectorAll('.goods__item').length == 0) {
              cartWrapper.querySelector('.empty').style.display = 'block';
            }
          });
      });
    }
  });
});

// loadContent('https://jsonplaceholder.typicode.com/posts');

// const example = {username: "Ivan"};

// fetch('https://jsonplaceholder.typicode.com/posts'),
//     {
//       method: "POST",
//       body: JSON.stringify(example)
//     }) //promise

//   .then(response => response.json())  //promise
//   .then(json => console.log(json))
