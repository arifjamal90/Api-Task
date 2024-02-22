let data; 
let sortDirection = {};
let currentPage = 1;
const pageSize = 10;

let getApi = fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => {
    return response.json();
  })
  .then((jsonData) => {
    data = jsonData; 
    renderTable(data, currentPage);
  })
  .catch((error) => {
    console.log(error);
  });
  const dataContainer = document.querySelector(".Container");

function renderTable(data, page) {

  const table = document.createElement("table");
  table.classList.add("data-table");

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = data.slice(start, end);

  const headerRow = document.createElement("tr");
  headerRow.classList.add("headerrow");
  headerRow.innerHTML = `<th onclick='sortBy(\"id\")'>ID <span>&#x25BE;</span></th>
  <th onclick='sortBy(\"title\")'>Title <span>&#x25BE;</span></th>
  <th onclick='sortBy(\"completed\")'>Completed <span>&#x25BE;</span></th>`;
  table.appendChild(headerRow);

  paginatedData.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("rowdata");
  
    row.innerHTML = 
      `<td>${item.id}</td>
      <td>${item.title}</td>
      <td>${item.completed}</td>`
  
    table.appendChild(row);
  });
 
  dataContainer.innerHTML = ''; 
  dataContainer.appendChild(table);
}
let toggle = true;
function sortBy(column) {
  toggle = !toggle;
  data.sort((a, b) => {
    if (toggle) {
      if (a.column < b>column) return -1;
      if (a.column > b.column) return 1;
    } else {
      if (a.column> b.column) return -1;
      if (a.column < b.column) return 1;
    }
    return 0;
  });

  renderTable(data, currentPage);
}


// search code here-------------------------------->

const searchFunc = () => {
  const filter = document.querySelector("#mySearch").value.toUpperCase();
  const table = dataContainer.querySelector(".data-table");
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let found = false;
    const cells = rows[i].getElementsByTagName("td");

    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].textContent.toUpperCase(); 

      if (cellText.indexOf(filter) > -1) {
        found = true;
        break;
      }
    }

    rows[i].style.display = found ? "" : "none";
  }
};

// Next page navigation
function nextPage() {
  const totalPages = Math.ceil(data.length / pageSize);
  if (currentPage < totalPages) {
    currentPage++;
    renderTable(data, currentPage);
  }
}

// Previous page navigation
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTable(data, currentPage);
  }
}
