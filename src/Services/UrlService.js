class UrlServiceClass {
  constructor() {
    this.port = 8080;
    this.baseUrl = `http://localhost:${this.port}`;
    this.allUsers = `${this.baseUrl}/api/admin/users`;
    this.allCoupons = `${this.baseUrl}/api/coupons`;
    this.admin = `${this.baseUrl}/api/admin`;
    this.auth = `${this.baseUrl}/api/auth`;
  }
}
const UrlService = new UrlServiceClass();
export default UrlService;
