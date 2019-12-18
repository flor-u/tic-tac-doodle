import axios from 'axios';

class AuthService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
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

  upload = (image) => {
    return this.instance.post('/upload', image)
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

  updateProfile = (user) => {
    return this.instance
      .put("/profiles/:id", { user })
      .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  };

  getAllDoodles = () => {
    return this.instance
    .get('/getAllDoodles')
    .then(res => Promise.resolve(res.data[0].doodles))
    .catch(error => console.error(error))
  }

  deleteDoodle=(user, idx)=>{
    return this.instance
    .put('/deleteDoodle', {user, idx})
    .then(res => Promise.resolve(res.data))
    .catch(error => console.error(error))
  }

}





export default AuthService;