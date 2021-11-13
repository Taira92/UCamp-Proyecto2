window.xAction = 0;
var id = 0;

var arrayStorage = [];

if (localStorage.length > 0) {
  for (const key in localStorage) {
    arrayStorage.push(key);
  }
  const arrayNumber = arrayStorage.filter(Number);

  for (let index = 0; index < arrayNumber.length; index++) {
    if (parseInt(arrayNumber[index]) > id) {
      id = parseInt(arrayNumber[index]) + 1;
    }
  }
  fillTable();
} else {
  id = 1;
}

class Product {
  id;
  code;
  name;
  price;

  constructor(id, code, name, price) {
    (this.id = id),
      (this.code = code),
      (this.name = name),
      (this.price = price);
  }
}

function addProduct() {
  if (document.getElementById("txtCode").value == "") {
    alert("Debe ingresar el campo codigo!");
    document.getElementById("txtCode").focus();
  } else if (document.getElementById("txtProduct").value == "") {
    alert("Debe ingresar el campo producto!");
    document.getElementById("txtProduct").focus();
  } else if (document.getElementById("txtPrice").value == "") {
    alert("Debe ingresar el campo precio!");
    document.getElementById("txtPrice").focus();
  } else {
    if (xAction == 0) {
      const objProduct = new Product(
        id,
        document.getElementById("txtCode").value,
        document.getElementById("txtProduct").value,
        document.getElementById("txtPrice").value
      );
      localStorage.setItem(id, JSON.stringify(objProduct));
      id++;
    } else {
      const objProduct = new Product(
        xAction,
        document.getElementById("txtCode").value,
        document.getElementById("txtProduct").value,
        document.getElementById("txtPrice").value
      );
      localStorage.setItem(xAction, JSON.stringify(objProduct));
    }

    clearData();
    $("#staticBackdrop").modal("hide");
    fillTable();
  }
}

function fillTable() {
  let tbody = document.querySelector("#tbProducts tbody");
  tbody.innerHTML = "";

  for (let index = 1; index <= id; index++) {
    if (JSON.parse(localStorage.getItem(index))) {
      let xProduct = JSON.parse(localStorage.getItem(index));

      var bEditar = document.createElement("button");
      var bEliminar = document.createElement("button");
      bEditar.name = "btnEditar";
      bEditar.classList.add("btn");
      bEditar.classList.add("btn-primary");
      bEditar.classList.add("button-table");
      bEditar.value = index;
      bEditar.addEventListener("click", (event) => {
        getDataById(index);
      });

      bEliminar.name = "btnEditar";
      bEliminar.classList.add("btn");
      bEliminar.classList.add("btn-primary");
      bEliminar.classList.add("button-table");
      bEliminar.addEventListener("click", (event) => {
        deleteProduct(index);
      });

      //CREAMOS LA FILA
      var row = document.createElement("tr");

      //CREAMOS LA CELDA
      //var tdId = document.createElement("td");
      var tdCode = document.createElement("td");
      var tdName = document.createElement("td");
      var tdPrice = document.createElement("td");

      //CREAMOS EL TEXTO DE LA CELDA
      //var textId = document.createTextNode(xProduct.id);
      var textCode = document.createTextNode(xProduct.code);
      var textName = document.createTextNode(xProduct.name);
      var textPrice = document.createTextNode(xProduct.price);
      var txtbEditar = document.createTextNode("Editar");
      var txtbEliminar = document.createTextNode("Eliminar");

      //ASIGNAMOS A LA CELDA EL TEXTO
      //tdId.appendChild(textId);
      tdCode.appendChild(textCode);
      tdName.appendChild(textName);
      tdPrice.appendChild(textPrice);
      bEditar.appendChild(txtbEditar);
      bEliminar.appendChild(txtbEliminar);

      //ASIGNAMOS A LA FILA LAS CELDAS
      //row.appendChild(tdId);
      row.appendChild(tdCode);
      row.appendChild(tdName);
      row.appendChild(tdPrice);
      row.appendChild(bEditar);
      row.appendChild(bEliminar);

      //ASIGNAMOS AL BODY LAS FILAS
      tbody.appendChild(row);
    }
  }
}

function getDataById(id) {
  let xProduct = JSON.parse(localStorage.getItem(id));
  $("#staticBackdrop").modal("toggle");
  txtCode.value = xProduct.code;
  txtProduct.value = xProduct.name;
  txtPrice.value = xProduct.price;
  setAction(id);
  fillTable();
}

function deleteProduct(id) {
  localStorage.removeItem(id);
  if (localStorage.length == 0) {
    id = 1;
  }

  fillTable();
}

function setAction(id) {
  xAction = id;
}

function clearData() {
  xAction = 0;
  txtCode.value = "";
  txtProduct.value = "";
  txtPrice.value = "";
}
