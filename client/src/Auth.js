import auth0 from 'auth0-js';

class Auth {
  accessToken;
  idToken;
  expiresAt;
  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: 'mycustomer.auth0.com',
      clientID: '78Uj1OuUejy94LGdZoYe5t2o90ln0pKp',
      audience: 'https://mycustomer.auth0.com/api/v2/',
      redirectUri: 'https://mycustomerapp.herokuapp.com/callback',
      //redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile email'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    //this.renewSession = this.renewSession.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  getAccessToken() {
    return this.accessToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  isEmailVerified() {
    return this.profile.email_verified;
  }

  hasRole(roles) {
    let userRoles = this.profile['https://user/roles'] || [];
    return roles.some(role => userRoles.includes(role));
  }

  signIn() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        //this.idToken = authResult.idToken;
        //this.accessToken = authResult.accessToken;
        //this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        //this.expiresAt = authResult.idTokenPayload.exp * 1000;
        resolve();
      });
    })
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.accessToken = authResult.accessToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }

  signOut() {
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: '78Uj1OuUejy94LGdZoYe5t2o90ln0pKp',
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;