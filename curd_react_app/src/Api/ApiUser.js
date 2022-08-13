
export function getUser() {
    return fetch('http://localhost:3000/user')
      .then(data => data.json())
    }