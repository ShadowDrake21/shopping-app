export function createProductWrapper(product) {
  const {
    brand,
    category,
    description,
    discountPercentage,
    price,
    rating,
    stock,
    thumbnail,
    title,
  } = product

  const productWrapper = `
  <div class="product__left">
    <img
      class="product__img"
      src="${thumbnail}"
      alt=""
    />
  </div>
  <div class="product__right">
    <span class="product__category">${brand}</span>
    <span class="product__category">${category}</span>
    <h3 class="product__title">
      ${title}
    </h3>
    <h6 class="product__price-old">${price}<span>$</span></h6>
    <h4 class="product__price">${Math.round(
      price - price * discountPercentage * 0.01
    )}<span>$</span></h4>
    <p class="product__descr">
      ${description}
    </p>
    <div class="product__additional">
      <div class="product__additional-text">
        Rate:<span class="product__additional-number product__additional-rate"
          >${rating}</span
        >
      </div>
      <div class="product__additional-text">
        Stock:<span class="product__additional-number product__additional-stock"
          >${stock}</span
        >
      </div>
    </div>
    <button id="addToCart" class="product__btn">Add to cart</button>
  </div>
  `

  return productWrapper
}

export function createUserWrapper(user) {
  const {
    firstName,
    lastName,
    age,
    gender,
    email,
    phone,
    birthDate,
    image,
    address: { city },
  } = user

  const userWrapper = `
  <div class="user__item-left">
    <img
      src="${image}"
      class="user__item-img"
      alt=""
    />
  </div>
  <div class="user__item-right">
    <div class="user__bio">
      <p class="user__bio-name">First name: ${firstName}</p>
      <p class="user__bio-name">Last name: ${lastName}</p>
      <p class="user__bio-age">Age: ${age}</p>
      <p class="user__bio-gender">Gender: ${gender}</p>
  
      <p class="user__bio-email">Email: ${email}</p>
      <p class="user__bio-phone">Phone: ${phone}</p>
      <p class="user__bio-birthday">Birthday: ${birthDate}</p>
      <p class="user__bio-city">City: ${city}</p>
    </div>
  </div>
  `

  return userWrapper
}

export function createLoginPopupWrapper() {
  const loginPopupWrapper = `
  <div class="popup__inner">
    <h2 class="popup__title">Log-in</h2>
    <form class="form popup__form" id="loginForm">
      <div class="popup__input-wrapper">
        <label for="loginName" class="popup_label">Username:</label
        ><input
          type="text"
          class="popup__input"
          id="loginName"
          placeholder="Enter your username"
        />
      </div>
      <div class="popup__input-wrapper">
        <label for="loginPassword" class="popup_label">Password:</label
        ><input
          type="password"
          class="popup__input"
          id="loginPassword"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" class="popup__btn" id="loginBtn" data-action='signup'>
        Sign-in
      </button>
    </form>
    <button type="button" data-action="popup__close" class="popup__close-btn">
      <i class="fa fa-window-close" data-action="popup__close" aria-hidden="true"></i>
    </button>
  </div>
  `
  return loginPopupWrapper
}

export function createSignupPopupWrapper() {
  const signupPopupWrapper = `
  <div class="popup__inner">
    <h2 class="popup__title">Sign-up</h2>
    <form class="form popup__form" id="signupForm">
      <div class="popup__input-wrapper">
        <label for="signupEmail" class="popup_label">Email:</label
        ><input
          type="text"
          class="popup__input"
          id="signupEmail"
          placeholder="Enter your email"
          />
      </div>
      <div class="popup__input-wrapper">
        <label for="signupFn" class="popup_label">First name:</label
        ><input
          type="text"
          class="popup__input"
          id="signupFn"
          placeholder="Enter your first name"
        />
      </div>
      <div class="popup__input-wrapper">
        <label for="signupLn" class="popup_label">Last name:</label
        ><input
          type="text"
          class="popup__input"
          id="signupLn"
          placeholder="Enter your last name"
        />
      </div>
      <div class="popup__input-wrapper">
        <label for="signupName" class="popup_label">Username:</label
        ><input
          type="text"
          class="popup__input"
          id="signupName"
          placeholder="Enter your username"
        />
      </div>
      <div class="popup__input-wrapper">
        <label for="signupPassword" class="popup_label">Password:</label
        ><input
          type="password"
          class="popup__input"
          id="signupPassword"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" class="popup__btn" id="signupBtn" data-action='signup'>
        Sign-up
      </button>
    </form>
    <button type="button" data-action="popup__close" class="popup__close-btn">
      <i class="fa fa-window-close" data-action="popup__close" aria-hidden="true"></i>
    </button>
  </div>
  `
  return signupPopupWrapper
}
