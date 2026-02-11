let lang="ru"; let cart=[];

const texts={
  ru:{search:"Поиск...", cart:"Ваш заказ", total:"Итого", waiter:"📞 Позвать официанта", pay:"Оплатить онлайн", whatsapp:"WhatsApp заказ"},
  kz:{search:"Іздеу...", cart:"Сіздің тапсырысыңыз", total:"Жалпы", waiter:"📞 Даяшы шақыру", pay:"Онлайн төлем", whatsapp:"WhatsApp тапсырыс"},
  en:{search:"Search...", cart:"Your Order", total:"Total", waiter:"📞 Call Waiter", pay:"Pay Online", whatsapp:"WhatsApp Order"}
};

const menu=[
  {name:{ru:"Маргарита", kz:"Маргарита", en:"Margherita"}, desc:{ru:"Томаты, моцарелла", kz:"Қызанақ, моцарелла", en:"Tomatoes, mozzarella"}, price:2500, category:"pizza"},
  {name:{ru:"Пепперони", kz:"Пепперони", en:"Pepperoni"}, desc:{ru:"Острая салями", kz:"Ащы салями", en:"Spicy salami"}, price:2800, category:"pizza"},
  {name:{ru:"Четыре сыра", kz:"Төрт ірімшік", en:"Four Cheese"}, desc:{ru:"Моцарелла, дорблю", kz:"Моцарелла, дорблю", en:"Mozzarella, dorblu"}, price:3200, category:"pizza"},
  {name:{ru:"Карбонара", kz:"Карбонара", en:"Carbonara"}, desc:{ru:"Бекон, сливочный соус", kz:"Бекон, кілегей", en:"Bacon, cream"}, price:2700, category:"pasta"},
  {name:{ru:"Цезарь", kz:"Цезарь", en:"Caesar"}, desc:{ru:"Курица, соус цезарь", kz:"Тауық, цезарь соусы", en:"Chicken, Caesar sauce"}, price:2400, category:"salad"},
  {name:{ru:"Минестроне", kz:"Минестроне", en:"Minestrone"}, desc:{ru:"Овощной суп", kz:"Көкөніс сорпасы", en:"Vegetable soup"}, price:1900, category:"soup"},
  {name:{ru:"Тирамису", kz:"Тирамису", en:"Tiramisu"}, desc:{ru:"Кофейный десерт", kz:"Кофелі десерт", en:"Coffee dessert"}, price:1800, category:"dessert"},
  {name:{ru:"Ванильное мороженое", kz:"Ванильді балмұздақ", en:"Vanilla Ice Cream"}, desc:{ru:"Классическое", kz:"Классикалық", en:"Classic"}, price:1200, category:"icecream"},
  {name:{ru:"Эспрессо", kz:"Эспрессо", en:"Espresso"}, desc:{ru:"Кофе", kz:"Кофе", en:"Coffee"}, price:800, category:"drinks"}
];

const menuContainer=document.getElementById("menu");
const searchInput=document.getElementById("search");
const categorySelect=document.getElementById("categorySelect");
const cartSidebar=document.getElementById("cart-sidebar");
const cartCount=document.getElementById("cart-count");

function renderCards(filteredMenu){
  menuContainer.innerHTML="";
  filteredMenu.forEach((item,i)=>{
    const card=document.createElement("div"); card.className="card";
    card.innerHTML=`<h3>${item.name[lang]}</h3><p>${item.desc[lang]}</p>
      <div class="price-add"><span>${item.price} ₸</span>
      <button onclick="addToCart(${i})">+</button></div>`;
    menuContainer.appendChild(card);
  });
}

function filterMenu(){
  const search=searchInput.value.toLowerCase();
  const category=categorySelect.value;
  const filtered=menu.filter(item=>
    (category==="all"||item.category===category) &&
    item.name[lang].toLowerCase().includes(search)
  );
  renderCards(filtered);
}

function setLang(l){ lang=l; searchInput.placeholder=texts[lang].search; filterMenu(); }

function addToCart(i){
  cart.push(menu[i]);
  updateCart();

  // Анимация карточки
  const cards=document.getElementsByClassName("card");
  cards[i].classList.add("added");
  setTimeout(()=>{ cards[i].classList.remove("added"); },400);

  // Подсветка корзины
  cartSidebar.classList.add("updated");
  setTimeout(()=>{ cartSidebar.classList.remove("updated"); },400);

  // Обновление счётчика
  cartCount.innerText=cart.length;
  if(!cartSidebar.classList.contains("show")) cartSidebar.classList.add("show");
}

function updateCart(){
  const list=document.getElementById("cart-items"); list.innerHTML=""; let total=0;
  cart.forEach(item=>{ list.innerHTML+=`<p>${item.name[lang]} - ${item.price} ₸</p>`; total+=item.price; });
  document.getElementById("total").innerText=total;
  document.getElementById("cart-title").innerText=texts[lang].cart + " 🛒";
  document.getElementById("total-text").innerText=texts[lang].total;
}

function toggleCart(){ cartSidebar.classList.toggle("show"); }
function closeCart(){ cartSidebar.classList.remove("show"); }

function sendOrder(){
  if(cart.length===0){ alert("Cart is empty!"); return; }
  let text="Order:%0A"; cart.forEach(item=>{ text+=item.name[lang]+" - "+item.price+" ₸%0A"; });
  window.open("https://wa.me/77000000000?text="+text);
}

function callWaiter(){ alert(texts[lang].waiter); }
function payOnline(){ alert("Это демо онлайн-оплата"); }

filterMenu();
