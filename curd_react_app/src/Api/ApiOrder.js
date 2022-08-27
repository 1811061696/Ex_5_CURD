const ApiOrder = "http://localhost:3000/order";

export function getOrder() {
  return fetch(ApiOrder).then((data) => data.json());
}

export function getOneOrder(id) {
  return fetch(ApiOrder + "/" + id).then((data) => data.json());
}

export function createOrder(data, callback) {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(JSON.stringify(data));
  fetch(ApiOrder, options)
    .then((response) => response.json())
    .then(callback);
  // .then(alert("Thêm thành công"));
}

export function handleDeleteOrder(id) {
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(ApiOrder + "/" + id, options).then(function (response) {
    return response.json();
  });
}

export function handleUpdateOrder(data, id) {
  var option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(ApiOrder + "/" + id, option).then(function (response) {
    alert("Sửa thành công");
    return response;
  });
}

// api Cấp trước

export function getAllUser() {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
  // .then(console.log);
}

export function getOneUser(id) {
  return fetch("https://dummyjson.com/users/" + id).then((res) => res.json());
  // .then(console.log);
}

export function getAllProduct() {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
  // .then(console.log);
}

export function getOneProduct(id) {
  return fetch("https://dummyjson.com/products/" + id).then((res) =>
    res.json()
  );
  // .then(console.log);
}
