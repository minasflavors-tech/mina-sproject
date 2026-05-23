const WHATSAPP_NUMBER = '212600000000';
const OWNER_EMAIL = 'owner@example.com';

const cakes = [
  {
    id: 'choco-delice',
    name: 'Choco Delice',
    description: 'Moelleux chocolat noir et creme legere.',
    basePrice: 180,
  },
  {
    id: 'fraise-nuage',
    name: 'Fraise Nuage',
    description: 'Gennoise vanille, creme et fraises fraiches.',
    basePrice: 200,
  },
  {
    id: 'caramel-crunch',
    name: 'Caramel Crunch',
    description: 'Biscuit croustillant, caramel beurre sale.',
    basePrice: 220,
  },
  {
    id: 'vanille-signature',
    name: 'Vanille Signature',
    description: 'Vanille de Madagascar, texture douce.',
    basePrice: 160,
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

const state = {
  cart: [],
};

const cakeGrid = document.getElementById('cake-grid');
const cartList = document.getElementById('cart-list');
const emptyCart = document.getElementById('empty-cart');
const subtotalNode = document.getElementById('subtotal');
const deliveryFeeNode = document.getElementById('delivery-fee');
const grandTotalNode = document.getElementById('grand-total');
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

function unitPrice(cake, sizeValue, flavorValue) {
  const size = sizeOptions.find((item) => item.value === sizeValue);
  const flavor = flavorOptions.find((item) => item.value === flavorValue);
  const base = cake.basePrice * (size?.multiplier || 1);
  return Math.round(base + (flavor?.extra || 0));
}

function buildCatalog() {
  cakeGrid.innerHTML = cakes.map((cake) => {
    const sizeChoices = sizeOptions
      .map((size) => `<option value="${size.value}">${size.label}</option>`)
      .join('');

    const flavorChoices = flavorOptions
      .map((flavor) => `<option value="${flavor.value}">${flavor.label}${flavor.extra ? ` (+${flavor.extra} MAD)` : ''}</option>`)
      .join('');

    return `
      <article class="cake-item" data-cake-id="${cake.id}">
        <h3>${cake.name}</h3>
        <p class="muted">${cake.description}</p>
        <p><strong>A partir de ${formatMAD(cake.basePrice)}</strong></p>

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

        <label>Quantite</label>
        <input class="cake-qty" type="number" min="1" max="10" value="1">

        <button type="button" class="btn add-btn">Ajouter au panier</button>
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
          <small>${item.sizeLabel} | ${item.flavorLabel} | x${item.quantity}</small>
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
  const cake = cakes.find((item) => item.id === card.dataset.cakeId);
  const sizeValue = card.querySelector('.cake-size').value;
  const flavorValue = card.querySelector('.cake-flavor').value;
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
  const price = unitPrice(cake, sizeValue, flavorValue);

  state.cart.push({
    name: cake.name,
    sizeLabel: size?.label || 'Petit',
    flavorLabel: flavor?.label || 'Classique',
    quantity,
    total: price * quantity,
  });

  renderCart();
  showSuccess(`${cake.name} ajoute au panier.`);
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
    .map((item) => `${item.name} (${item.sizeLabel}, ${item.flavorLabel}) x${item.quantity}`)
    .join(', ');

  const waMessage = encodeURIComponent(
    `Bonjour, je souhaite commander: ${summary}. Nom: ${name}. Tel: ${phone}. Adresse: ${address}. Total estime: ${formatMAD(total)}.`
  );
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  state.cart = [];
  renderCart();
  form.reset();
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
setupContactLinks();
setupThemeToggle();
renderCart();
