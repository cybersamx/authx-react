import { name, internet, random } from 'faker';

const delay = 1000;
const keyUser = 'authx.user';
const registeredUsers = new Map([
  ['admin', {
    id: '007', username: 'admin', email: 'admin@example.com', password: 'qwerty', firstname: 'App', lastname: 'Admin',
  }],
  ['lee', {
    id: 'abc123', username: 'lee', email: 'lee@acme.com', password: 'qwerty', firstname: 'Steve', lastname: 'Lee',
  }],
]);

const apps = new Map([
  ['94274fj34', { id: '94274fj34', secret: '324u349ch', callback: 'http://localhost:3000/callback' }],
  ['we4hf7325', { id: 'we4hf7325', secret: '3847fj345', callback: 'http://localhost:3000/callback' }],
  ['u832fy34d', { id: 'u832fy34d', secret: 'f3jfvcsr0', callback: 'http://localhost:3000/callback' }],
  ['348fj23nd', { id: '348fj23nd', secret: 'sd9324rfv', callback: 'http://localhost:3000/callback' }],
  ['2348fnq23', { id: '2348fnq23', secret: '23458fj23', callback: 'http://localhost:3000/callback' }],
]);

// eslint-disable-next-line no-plusplus
for (let i = 0; i < 5; i++) {
  const user = {
    id: newUID(),
    username: internet.userName(),
    email: internet.email(),
    password: 'qwerty',
    firstname: name.firstName(),
    lastname: name.lastName(),
  };

  registeredUsers.set(user.username, user);
}

function newUID() {
  return random.alphaNumeric(6);
}

function newToken() {
  return (Math.random() * 1000000000).toString(16);
}

function setSession(user, token) {
  // Remove the password property.
  const { password, ...rest } = user;

  // Merge token to the final object.
  const merged = {
    ...rest,
    token,
  };

  localStorage.setItem(keyUser, JSON.stringify(merged));
}

function getSession() {
  const user = localStorage.getItem(keyUser);

  return JSON.parse(user);
}

function isAuth() {
  return !!getSession();
}

async function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = registeredUsers.get(username);
      if (!found) {
        return reject(new Error('user not found'));
      }

      if (found.password !== password) {
        return reject(new Error('invalid credentials'));
      }

      const token = newToken();
      setSession(found, token);
      return resolve(token);
    }, 2000);
  });
}

async function logout() {
  return new Promise((resolve) => {
    // Using setTimeout to simulate network latency.
    setTimeout(() => {
      localStorage.removeItem(keyUser);
      resolve();
    }, delay);
  });
}

async function sendPasswordReset() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

async function addUser(user) {
  return new Promise((resolve, reject) => {
    const id = newUID();
    setTimeout(() => {
      const merged = {
        ...user,
        id,
      };

      if (registeredUsers.has(user.username)) {
        return reject(new Error(`${user.username} exists`));
      }

      registeredUsers.set(user.username, merged);
      return resolve(merged);
    }, delay);
  });
}

async function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = Array.from(registeredUsers.values(), (key) => {
        // Remove the password property.
        const { password, ...rest } = key;
        return { ...rest };
      });

      resolve(users);
    }, delay);
  });
}

async function getApps() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from(apps.values()));
    }, delay);
  });
}

// The useAuth hook is a wrapper to this service, make sure exported functions are also reflected
// in the useAuth hook.
export {
  getSession, isAuth, login, logout, sendPasswordReset, addUser, getUsers, getApps,
};
