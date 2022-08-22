const ApiUser = "http://localhost:3000/user";

export function getUser() {
  return fetch(ApiUser).then((data) => data.json());
}

export function getOneUser(id) {
  return fetch(ApiUser + "/" + id).then((data) => data.json());
}

export function createUser(data, callback) {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(options.body);
  fetch(ApiUser, options)
    .then((response) => response.json())
    .then(callback)
    .then(alert("Thêm thành công"));
}

export function handleDeleteUser(id) {
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(ApiUser + "/" + id, options).then(function (response) {
    return response.json();
  });
}

export function handleUpdateUser(data, id) {
  var option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(ApiUser + "/" + id, option).then(function (response) {
    alert("Sửa thành công")
    return response;
  });
}
