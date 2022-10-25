var producesApi = "http://localhost:3000/produces";

function start() {
  getProduce(renderProduce);
  handleCreateFrom();
}

start();

function getProduce(callback) {
  fetch(producesApi)
    .then((response) => {
      return response.json();
    })
    .then(callback);
}

function handleCreateProduce(data, callback) {
  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(producesApi, option)
    .then(function (response) {
      response.json();
    })
    .then(callback);
}

function handleDeleteProduce(id) {
  var option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(producesApi + "/" + id, option)
    .then(function (response) {
      response.json();
    })
    .then(function () {
      var produceItem = document.querySelector(".course-item-" + id);
      if (produceItem) {
        produceItem.remove();
      }
    });
}

function handleUpdateProduce(id) {
  var courseItem = document.querySelector(".course-item-" + id);
  var getName = courseItem.querySelector("h1").innerText; // lay trong danh sach
  var getDescription = courseItem.querySelector("p").innerText;

  var name = document.querySelector("input[name='name']"); // lay trong input name
  var description = document.querySelector("input[name='description']"); // lay trong input description

  name.value = getName;
  description.value = getDescription;

  if (!document.querySelector("#update")) {
    document.querySelector("#create").id = "update";
    let updateBtn = document.querySelector("#update");
    updateBtn.innerText = "Luu";

    updateBtn.onclick = function () {
      if (name.value != "" || description.value != "") {
        getName = name.value;
        getDescription = description.value;
        var data = {
          name: getName,
          description: getDescription,
        };
        updateProduce(id, data, function () {
          document.querySelector("#update").id = "create";
          document.querySelector("#create").innerText = "Create";
          name.value = "";
          description.value = "";
          getProduce(renderProduce);
          handleCreateFrom();
        });
      }
    };
  }
}

function updateProduce(id, data, callback) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(producesApi + "/" + id, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function renderProduce(produces) {
  const listProduct = document.querySelector("#list-produce");
  var htmls = produces.map((produce) => {
    return `
        <li class="course-item-${produce.id}">
            <h1>${produce.name}</h1>
            <p>${produce.description}</p>
            <button onclick="handleDeleteProduce(${produce.id})" name="xoa">Xóa</button>
            <button onclick="handleUpdateProduce(${produce.id})" name="sua"">Sửa</button>
        </li>
        `;
  });
  listProduct.innerHTML = htmls.join("");
}

function handleCreateFrom() {
  var createBtn = document.querySelector(".create-btn");
  createBtn.onclick = () => {
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('input[name="description"]').value;
    formData = {
      name: name,
      description: description,
    };

    handleCreateProduce(formData, function () {
      getProduce(renderProduce);
    });
  };
}
