const WHATSAPP_NUMBER = '0666114128';
const OWNER_EMAIL = 'owner@example.com';

const categories = [
  { value: 'cakes', label: 'Cakes' },
  { value: 'cookies', label: 'Cookies' },
  { value: 'sable', label: 'Sablé' },
  { value: 'style-maroccain', label: 'Style Maroccain' },
];

const products = [
  {
    id: 'choco-delice',
    category: 'cakes',
    name: 'Choco Delice',
    description: 'Moelleux chocolat noir et creme legere.',
    basePrice: 180,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
    ingredients: ['Farine', 'Cacao', 'Oeufs', 'Beurre', 'Creme', 'Chocolat noir'],
  },
  {
    id: 'fraise-nuage',
    category: 'cakes',
    name: 'Fraise Nuage',
    description: 'Gennoise vanille, creme et fraises fraiches.',
    basePrice: 200,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
    ingredients: ['Farine', 'Oeufs', 'Vanille', 'Creme', 'Fraises', 'Sucre'],
  },
  {
    id: 'red-velvet',
    category: 'cakes',
    name: 'Red Velvet Cream',
    description: 'Texture velours, creme cheese et note cacao.',
    basePrice: 240,
    image: 'images.jpeg',
    promotion: { label: '-15%', discount: 15 },
    ingredients: ['Farine', 'Cacao', 'Lait ribot', 'Beurre', 'Cream cheese', 'Vanille'],
  },
  {
    id: 'choco-chip',
    category: 'cookies',
    name: 'Choco Chip Cookies',
    description: 'Cookies moelleux, pepites chocolat et vanille.',
    basePrice: 95,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80',
    ingredients: ['Farine', 'Beurre', 'Sucre brun', 'Oeufs', 'Pepites de chocolat', 'Vanille'],
  },
  {
    id: 'double-choco',
    category: 'cookies',
    name: 'Double Choco',
    description: 'Cookie epais, chocolat intense, coeur fondant.',
    basePrice: 110,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=80',
    promotion: { label: '-10%', discount: 10 },
    ingredients: ['Farine', 'Cacao', 'Beurre', 'Chocolat noir', 'Sucre', 'Oeufs'],
  },
  {
    id: 'sable-vanille',
    category: 'sable',
    name: 'Sablé Vanille',
    description: 'Sablés fondants au beurre et vanille.',
    basePrice: 80,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    ingredients: ['Farine', 'Beurre', 'Sucre', 'Vanille', 'Sel'],
  },
  {
    id: 'sable-amande',
    category: 'sable',
    name: 'Sablé Amande',
    description: 'Biscuit croustillant aux amandes grillees.',
    basePrice: 85,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1200&q=80',
    ingredients: ['Farine', 'Beurre', 'Amandes', 'Sucre', 'Oeufs', 'Vanille'],
  },
  {
    id: 'msemen-honey',
    category: 'style-maroccain',
    name: 'Msemen Miel',
    description: 'Patisserie feuilletee au miel et a la fleur d oranger.',
    basePrice: 120,
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Msemmen.jpg',
    ingredients: ['Semoule fine', 'Farine', 'Miel', 'Beurre', 'Eau de fleur d oranger', 'Sel'],
  },
  {
    id: 'chebakia',
    category: 'style-maroccain',
    name: 'Chebakia',
    description: 'Gateau marocain aux epices, miel et sesame.',
    basePrice: 135,
    image: 'chebakia.jpg',
    ingredients: ['Farine', 'Anis', 'Sesame', 'Cannelle', 'Miel', 'Huile'],
  },
  {
    id: 'ghriba',
    category: 'style-maroccain',
    name: 'Ghriba Amande',
    description: 'Cookies marocains fondants aux amandes et orange.',
    basePrice: 100,
    image: 'ghriba.jpg',
    promotion: { label: '-12%', discount: 12 },
    ingredients: ['Amandes', 'Farine', 'Sucre glace', 'Oeufs', 'Zeste d orange', 'Beurre'],
  },
];

const sizeOptions = [
  { value: 'petit', label: 'Petit', multiplier: 1 },
  { value: 'moyen', label: 'Moyen', multiplier: 1.25 },
  { value: 'grand', label: 'Grand', multiplier: 1.55 },
];

const flavorOptions = [
  { value: 'classique', label: 'Classique', extra: 0 },
  { value: 'premium', label: 'Premium', extra: 20 },
  { value: 'sans-sucre', label: 'Sans sucre', extra: 25 },
];

const decorationOptions = [
  { value: 'aucune', label: 'Aucune', extra: 0 },
  { value: 'bougies', label: 'Bougies', extra: 15 },
  { value: 'fleurs', label: 'Fleurs', extra: 25 },
  { value: 'elegante', label: 'Deco elegante', extra: 40 },
];

const state = {
  cart: [],
  activeCategory: 'cakes',
  cartOpen: false,
};

const cakeGrid = document.getElementById('cake-grid');
const categoryTabs = document.getElementById('category-tabs');
const catalogMeta = document.getElementById('catalog-meta');
const cartList = document.getElementById('cart-list');
const emptyCart = document.getElementById('empty-cart');
const subtotalNode = document.getElementById('subtotal');
const deliveryFeeNode = document.getElementById('delivery-fee');
const grandTotalNode = document.getElementById('grand-total');
const cartCountNode = document.getElementById('cart-count');
const cartFab = document.getElementById('cart-fab');
const cartDrawer = document.getElementById('cart-drawer');
const closeCartButton = document.getElementById('close-cart');
const deliverySelect = document.getElementById('delivery');
const submitBtn = document.getElementById('submit-order');
const resultNode = document.getElementById('result');
const form = document.getElementById('order-form');
const whatsappLink = document.getElementById('whatsapp-link');
const bugLink = document.getElementById('bug-link');
const themeToggle = document.getElementById('theme-toggle');
const THEME_KEY = 'mina-theme';

function formatMAD(value) {
  return `${value.toLocaleString('fr-FR')} MAD`;
}

function getPromotion(cake) {
  return cake.promotion || null;
}

function currentBasePrice(cake) {
  const promotion = getPromotion(cake);
  if (!promotion) {
    return cake.basePrice;
  }
  return Math.round(cake.basePrice * (1 - promotion.discount / 100));
}

function unitPrice(cake, sizeValue, flavorValue) {
  const size = sizeOptions.find((item) => item.value === sizeValue);
  const flavor = flavorOptions.find((item) => item.value === flavorValue);
  const base = currentBasePrice(cake) * (size?.multiplier || 1);
  return Math.round(base + (flavor?.extra || 0));
}

function decorationPrice(decorationValue) {
  const decoration = decorationOptions.find((item) => item.value === decorationValue);
  return decoration?.extra || 0;
}

function setCartOpen(nextOpen) {
  state.cartOpen = nextOpen;
  cartDrawer.classList.toggle('open', nextOpen);
  cartDrawer.setAttribute('aria-hidden', nextOpen ? 'false' : 'true');
}

function buildCategoryTabs() {
  categoryTabs.innerHTML = categories.map((category) => `
    <button
      type="button"
      class="category-tab ${state.activeCategory === category.value ? 'active' : ''}"
      data-category="${category.value}"
    >
      ${category.label}
    </button>
  `).join('');
}

function buildCatalog() {
  const filteredProducts = products.filter((product) => product.category === state.activeCategory);

  catalogMeta.textContent = `${filteredProducts.length} article${filteredProducts.length > 1 ? 's' : ''} dans ${categories.find((category) => category.value === state.activeCategory)?.label || ''}`;

  cakeGrid.innerHTML = filteredProducts.map((cake) => {
    const sizeChoices = sizeOptions
      .map((size) => `<option value="${size.value}">${size.label}</option>`)
      .join('');

    const flavorChoices = flavorOptions
      .map((flavor) => `<option value="${flavor.value}">${flavor.label}${flavor.extra ? ` (+${flavor.extra} MAD)` : ''}</option>`)
      .join('');

    const decorationChoices = decorationOptions
      .map((decoration) => `<option value="${decoration.value}">${decoration.label}${decoration.extra ? ` (+${decoration.extra} MAD)` : ''}</option>`)
      .join('');

    const promotion = getPromotion(cake);
    const displayBasePrice = currentBasePrice(cake);
    const hasPromotion = Boolean(promotion);

    return `
      <article class="cake-item" data-cake-id="${cake.id}">
        <div class="cake-head">
          <img class="cake-photo" src="${cake.image}" alt="${cake.name}" onerror="this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80';this.onerror=null;">
          <h3>${cake.name}</h3>
          ${hasPromotion ? `<span class="promo-badge">${promotion.label}</span>` : ''}
        </div>
        <div class="cake-content">
          <p class="muted">${cake.description}</p>
          <div class="price-line">
            <strong>A partir de ${formatMAD(displayBasePrice)}</strong>
            ${hasPromotion ? `<span class="price-old">${formatMAD(cake.basePrice)}</span>` : ''}
          </div>

          <div class="row">
            <div>
              <label>Taille</label>
              <select class="cake-size">${sizeChoices}</select>
            </div>
            <div>
              <label>Option</label>
              <select class="cake-flavor">${flavorChoices}</select>
            </div>
          </div>

          <label>Decoration</label>
          <select class="cake-decoration">${decorationChoices}</select>

          <label>Quantite</label>
          <input class="cake-qty" type="number" min="1" max="10" value="1">

          <button type="button" class="btn add-btn">Ajouter au panier</button>

          <details class="ingredients">
            <summary>Voir les ingredients</summary>
            <ul>
              ${(cake.ingredients || []).map((ingredient) => `<li>${ingredient}</li>`).join('')}
            </ul>
          </details>
        </div>
      </article>
    `;
  }).join('');
}

function renderCart() {
  if (state.cart.length === 0) {
    cartList.innerHTML = '';
    emptyCart.style.display = 'block';
  } else {
    emptyCart.style.display = 'none';
    cartList.innerHTML = state.cart.map((item) => `
      <li class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.sizeLabel} | ${item.flavorLabel} | ${item.decorationLabel} | x${item.quantity}</small>
        </div>
        <div>${formatMAD(item.total)}</div>
      </li>
    `).join('');
  }

  const subtotal = state.cart.reduce((sum, item) => sum + item.total, 0);
  const fee = Number(deliverySelect.options[deliverySelect.selectedIndex].dataset.fee || 0);
  const grand = subtotal + fee;

  subtotalNode.textContent = formatMAD(subtotal);
  deliveryFeeNode.textContent = formatMAD(state.cart.length ? fee : 0);
  grandTotalNode.textContent = formatMAD(state.cart.length ? grand : 0);
  cartCountNode.textContent = String(state.cart.reduce((sum, item) => sum + item.quantity, 0));
}

function showError(message) {
  resultNode.className = 'result error';
  resultNode.textContent = message;
}

function showSuccess(message) {
  resultNode.className = 'result success';
  resultNode.textContent = message;
}

cakeGrid.addEventListener('click', (event) => {
  const button = event.target.closest('.add-btn');
  if (!button) {
    return;
  }

  const card = event.target.closest('.cake-item');
  const cake = products.find((item) => item.id === card.dataset.cakeId);
  const sizeValue = card.querySelector('.cake-size').value;
  const flavorValue = card.querySelector('.cake-flavor').value;
  const decorationValue = card.querySelector('.cake-decoration').value;
  const quantity = Number(card.querySelector('.cake-qty').value);

  if (!cake) {
    return;
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    showError('Quantite invalide. Choisissez un nombre entre 1 et 10.');
    return;
  }

  const size = sizeOptions.find((item) => item.value === sizeValue);
  const flavor = flavorOptions.find((item) => item.value === flavorValue);
  const decoration = decorationOptions.find((item) => item.value === decorationValue);
  const price = unitPrice(cake, sizeValue, flavorValue);
  const decorationCost = decorationPrice(decorationValue);

  state.cart.push({
    name: cake.name,
    category: cake.category,
    sizeLabel: size?.label || 'Petit',
    flavorLabel: flavor?.label || 'Classique',
    decorationLabel: decoration?.label || 'Aucune',
    quantity,
    total: (price + decorationCost) * quantity,
  });

  renderCart();
  showSuccess(`${cake.name} ajoute au panier.`);
  setCartOpen(true);
});

categoryTabs.addEventListener('click', (event) => {
  const button = event.target.closest('.category-tab');
  if (!button) {
    return;
  }

  state.activeCategory = button.dataset.category;
  buildCategoryTabs();
  buildCatalog();
});

cartFab.addEventListener('click', () => {
  setCartOpen(!state.cartOpen);
});

closeCartButton.addEventListener('click', () => {
  setCartOpen(false);
});

deliverySelect.addEventListener('change', renderCart);

submitBtn.addEventListener('click', () => {
  const name = form.name.value.trim();
  const phone = form.phone.value.replace(/\s+/g, ' ').trim();
  const address = form.address.value.trim();

  if (!name || !phone || !address) {
    showError('Veuillez remplir vos informations de livraison.');
    return;
  }

  if (state.cart.length === 0) {
    showError('Ajoutez au moins un gateau au panier avant envoi.');
    return;
  }

  const fee = Number(deliverySelect.options[deliverySelect.selectedIndex].dataset.fee || 0);
  const deliveryLabel = deliverySelect.options[deliverySelect.selectedIndex].textContent;
  const subtotal = state.cart.reduce((sum, item) => sum + item.total, 0);
  const total = subtotal + fee;

  showSuccess(`Commande envoyee. Merci ${name}. Total estime: ${formatMAD(total)}. Livraison: ${deliveryLabel}.`);

  const summary = state.cart
    .map((item) => `${item.name} (${item.sizeLabel}, ${item.flavorLabel}, ${item.decorationLabel}) x${item.quantity}`)
    .join(', ');

  const waMessage = encodeURIComponent(
    `Bonjour, je souhaite commander: ${summary}. Nom: ${name}. Tel: ${phone}. Adresse: ${address}. Total estime: ${formatMAD(total)}.`
  );
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  state.cart = [];
  renderCart();
  form.reset();
  setCartOpen(false);
});

function setupContactLinks() {
  const defaultMessage = encodeURIComponent('Bonjour, je souhaite avoir des informations sur vos gateaux.');
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`;

  const subject = encodeURIComponent("Signalement de bug - Mina's flavors");
  const body = encodeURIComponent('Bonjour,\n\nJe souhaite signaler le bug suivant:\n\nEtapes:\n1) \n2) \n\nResultat observe:\n\nResultat attendu:\n');
  bugLink.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
}

function applyTheme(theme) {
  const finalTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', finalTheme);
  if (!themeToggle) {
    return;
  }
  const isDark = finalTheme === 'dark';
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', isDark ? 'Activer le mode clair' : 'Activer le mode sombre');
  themeToggle.setAttribute('title', isDark ? 'Mode clair' : 'Mode sombre');
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch (_) {}
  return 'light';
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (_) {}
}

function setupThemeToggle() {
  applyTheme(getInitialTheme());
  if (!themeToggle) {
    return;
  }

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });
}

buildCatalog();
buildCategoryTabs();
setupContactLinks();
setupThemeToggle();
renderCart();
setCartOpen(false);
