let users = [
  {
    id: '1', // hint: use the shortid npm package to generate it
    name: 'Jane Doe', // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
  {
    id: '2', // hint: use the shortid npm package to generate it
    name: 'John Doe', // String, required
    bio: "Not Tarzan's Wife Brother, just random guy", // String, required
  },
  {
    id: '3', // hint: use the shortid npm package to generate it
    name: 'Jack Do', // String, required
    bio: 'Not famous, just need money', // String, required
  },
  {
    id: '4', // hint: use the shortid npm package to generate it
    name: 'Mack Dont', // String, required
    bio: 'Jacks second brother twice remove', // String, required
  },
];

function getUsers() {
  return users;
}

function getUserById(id) {
  return users.find((u) => u.id === id);
}

function createUser(data) {
  const payload = {
    id: String(users.length + 1),
    ...data,
  };

  users.push(payload);
  return payload;
}

function updateUser(id, data) {
  const index = users.findIndex((u) => u.id === id);
  users[index] = {
    ...users[index],
    ...data,
  };

  return users[index];
}

function deleteUser(id) {
  users = users.filter((u) => u.id != id);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
