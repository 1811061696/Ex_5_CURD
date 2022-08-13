export function getProducts() {
    return fetch('http://localhost:3000/product')
      .then(data => data.json())
  }