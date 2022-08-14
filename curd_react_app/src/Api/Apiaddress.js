export function getCity() {
  return fetch(`https://provinces.open-api.vn/api/p/`).then((data) =>
    data.json()
  );
}

export function getDistrist(id) {
  return fetch(`https://provinces.open-api.vn/api/p/${id}?depth=2`).then(
    (data) => data.json()
  );
}
