const ApiUser = "http://localhost:3000/user"

export function getUser() {
  return fetch(ApiUser).then((data) => data.json());
}


export function createUser(data, callback) {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(options.body)
  fetch(ApiUser, options)
    .then((response) => response.json())
    .then(callback);
}
