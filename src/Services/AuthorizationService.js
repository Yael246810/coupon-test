import store from "../components/Redux/Store";

class AuthorizationService {
  getPostHeaders() {
    return this.getHeaders();
  }

  getHeaders() {
    return {
      headers: {
        Authorization: store.getState().user.token,
        "Content-Type": "application/json",
      },
    };
  }
}

export default AuthorizationService;
