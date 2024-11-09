import store from "../components/Redux/Store";

class AuthorizationService {
  // Method to get post headers
  getPostHeaders() {
    return this.getHeaders();
  }

  // Method to get headers with authorization token
  getHeaders() {
    return {
      headers: {
        Authorization: store.getState().user.token, // Retrieve token from Redux store
        "Content-Type": "application/json",
      },
    };
  }
}

export default AuthorizationService;
