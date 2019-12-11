import axios from 'axios';

class AuthService {
  constructor() {
    this.instance = axios.create({
      baseURL:'http://localhost:4000/api/auth',
      // baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true    
    })
  }

  signup = (user) => {
    return this.instance.post('/signup', user)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  login = (user) => {
    return this.instance.post('/login', user)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  loggedInUser = () => {
    return this.instance.get('/loggedin')
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  logout = (user) => {
    return this.instance.post('/logout', user)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

//   upload = (image) => {
//     return this.instance.post('/upload', image)
//     .then(res => Promise.resolve(res.data))
//     .catch(error => console.error(error))
//   }

//   updateProfile = (username, course, campus) => {
//     return this.service
//       .put("/profiles/:id", { username, course, campus })
//       .then(response => response.data);
//   };

}



export default AuthService;