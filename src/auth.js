module.exports = {
  login(secret) {
    console.log('logging in', secret)
    if(secret === 'sesame');
      localStorage.auth = true
    return !!localStorage.auth  
  },
  loggedIn() {
    console.log('checking')
    return !!localStorage.auth;
  },
}
