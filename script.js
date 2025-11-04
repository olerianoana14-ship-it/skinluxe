const produtos = [
  { nome: "Kit Pincéis Premium", preco: 199.9, categoria: "acessórios", imagem: "img/pinceis.png" },
  { nome: "Máscara Volume Extremo", preco: 69.9, categoria: "olhos", imagem: "img/mascara.png" },
  { nome: "Delineador Precision", preco: 59.9, categoria: "olhos", imagem: "img/delineador.png" },
  { nome: "Batom Nude Perfeito", preco: 49.9, categoria: "lábios", imagem: "img/Batom nude.png"},
  { nome: "Base Premium", preco: 89.9, categoria: "bases", imagem: "img/base.png" },
  { nome: "Paleta Luxo", preco: 159.9, categoria: "paletas", imagem: "img/paleta2.png" },
  { nome: "Paleta Luxo", preco: 159.9, categoria: "paletas", imagem: "img/paleta2.png" },
  { nome: "Paleta Luxo", preco: 159.9, categoria: "paletas", imagem: "img/paleta2.png" },
  { nome: "Paleta Luxo", preco: 159.9, categoria: "paletas", imagem: "img/paleta2.png" },
  { nome: "Paleta Luxo", preco: 159.9, categoria: "paletas", imagem: "img/paleta2.png" },
];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const lista = document.getElementById("lista-produtos");
const filtros = document.querySelectorAll(".filtro");
const cartCount = document.getElementById("cart-count");
const btnAbrirCarrinho = document.getElementById("abrir-carrinho");
const sidebarCarrinho = document.getElementById("sidebar-carrinho");
const btnFecharCarrinho = document.getElementById("fechar-carrinho");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");

function renderizarProdutos(cat = "all") {
  lista.innerHTML = "";
  const filtrados = cat === "all" ? produtos : produtos.filter(p => p.categoria === cat);
  filtrados.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("produto");
    div.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <div class="info">
        <h3>${p.nome}</h3>
        <p>R$ ${p.preco.toFixed(2)}</p>
        <button>Adicionar</button>
      </div>
    `;
    div.querySelector("button").onclick = () => {
      carrinho.push(p);
      atualizarCarrinho();
    };
    lista.appendChild(div);
  });
}

function renderizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;
  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div style="flex:1;">
        <strong>${item.nome}</strong><br>
        <span>R$ ${item.preco.toFixed(2)}</span>
      </div>
      <button data-index="${index}">Remover</button>
    `;
    li.querySelector("button").onclick = () => {
      carrinho.splice(index, 1);
      atualizarCarrinho();
    };
    listaCarrinho.appendChild(li);
    total += item.preco;
  });
  totalCarrinho.textContent = "Total: R$ " + total.toFixed(2);
}

function atualizarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  cartCount.textContent = carrinho.length;
  renderizarCarrinho();
}

filtros.forEach(btn => {
  btn.onclick = () => {
    filtros.forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    renderizarProdutos(btn.dataset.cat);
  };
});

btnAbrirCarrinho.onclick = () => sidebarCarrinho.classList.add("aberta");
btnFecharCarrinho.onclick = () => sidebarCarrinho.classList.remove("aberta");

renderizarProdutos();
atualizarCarrinho();