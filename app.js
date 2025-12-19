async function loadCommands() {
  const res = await fetch("./data/commands.json");
  return res.json();
}

function render(list, items) {
  list.innerHTML = "";
  for (const it of items) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="tag">${it.category}</div>
      <h3>${it.title}</h3>
      <p>${it.desc}</p>
      <div class="code">${it.example}</div>
    `;
    list.appendChild(div);
  }
}

function applyFilter(items, q, cat) {
  const query = q.trim().toLowerCase();
  return items.filter(it => {
    const okCat = (cat === "all") || (it.category === cat);
    const okText = !query || (it.title.toLowerCase().includes(query) || it.desc.toLowerCase().includes(query));
    return okCat && okText;
  });
}

(async () => {
  const listEl = document.getElementById("list");
  const emptyEl = document.getElementById("empty");
  const searchEl = document.getElementById("search");
  const catEl = document.getElementById("category");

  const all = await loadCommands();

  function update() {
    const filtered = applyFilter(all, searchEl.value, catEl.value);
    render(listEl, filtered);
    emptyEl.classList.toggle("hidden", filtered.length !== 0);
  }

  searchEl.addEventListener("input", update);
  catEl.addEventListener("change", update);

  update();
})();
