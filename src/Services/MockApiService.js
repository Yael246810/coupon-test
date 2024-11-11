import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import UrlService from "./UrlService";

class MockApiService {
  constructor() {
    this.mock = new MockAdapter(axios);
    this.coupons = [];
    this.users = [];
  }

  startMocks() {
    this.mock.onPost(UrlService.auth + "/login").reply((config) => {
      console.log("Mocked POST request:", config);

      // Extracting the email and password from the request body
      const { email, password } = JSON.parse(config.data);
      console.log("this is the email " + email);
      console.log("this is the password " + password);

      if (email === "admin@gmail.com" && password === "1234") {
        console.log("Im inside the condition of email and password");
        return [
          200,
          {
            token: "mocked-jwt-token",
            id: 1,
            message: "Login successful",
          },
        ];
      }
      // I need to use a pop message here if the it's not in the list of users
      // Check the users list for matching credentials
      const user = this.users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        return [
          200,
          {
            token: "mocked-jwt-token-for-" + email,
            id: user.id || 2, // For simplicity, use a default ID
            message: "Login successful",
          },
        ];
      }

      console.log("return invalid credentials ");

      // If no matching user, return an error
      return [
        401,
        {
          message: "Invalid credentials",
        },
      ];
    });

    this.mock.onGet("/admin/coupons").reply(200, {
      coupons: this.coupons,
    });

    this.mock
      .onPost(new RegExp(`${UrlService.admin}/coupons/add`))
      .reply((config) => {
        const couponId = config.url.split("/").pop();

        console.log("Mocked add request to delete coupon with ID:", couponId);
        const newCoupon = JSON.parse(config.data);
        this.coupons.push(newCoupon);

        return [
          201,
          {
            message: "Coupon created successfully",
            coupons: this.coupons,
          },
        ];
      });

    this.mock
      .onDelete(new RegExp(`${UrlService.admin}/coupons/\\d+/delete`))
      .reply((config) => {
        const match = config.url.match(/\/coupons\/(\d+)\/delete/); // Capture the ID from the URL
        const couponId = match ? match[1] : null;

        console.log(
          "Mocked DELETE request to delete coupon with ID:" + couponId
        );

        console.log("before delete " + this.coupons.length);
        console.log("iddd: " + this.coupons[0].id);
        this.coupons = this.coupons.filter((coupon) => coupon.id !== couponId);
        console.log("after delete " + this.coupons.length);

        return [
          204,
          {
            message: "Coupon deleted successfully",
            coupons: this.coupons,
          },
        ];
      });

    this.mock
      .onPut(new RegExp(`${UrlService.admin}/coupons/\\d+/update`))
      .reply((config) => {
        console.log("mocking update response");

        const match = config.url.match(/\/coupons\/(\d+)\/update/); // Capture the ID from the URL
        const couponId = match ? parseInt(match[1], 10) : null;

        console.log("coupon id is  " + couponId);
        const updatedCouponData = JSON.parse(config.data); // update
        console.log("coupon id is " + updatedCouponData); //1
        const getCouponById = this.coupons.find(
          // here is the problem
          (coupon) => coupon.id === updatedCouponData
        );
        console.log(getCouponById);
        console.log(
          "Mocked PUT request to update coupon with ID:",
          getCouponById
        );
        console.log("Updated coupon data:", updatedCouponData);

        let couponFound = false;
        console.log("coupon wasnt found");
        this.coupons = this.coupons.map((coupon) => {
          console.log("map the coupon ");
          if (coupon.id === couponId) {
            couponFound = true;
            return { ...coupon, ...updatedCouponData };
          }
          return coupon;
        });

        if (!couponFound) {
          return [404, { message: "Coupon not found" }]; // It falls here, the Update Coupon. To check what to do with it.
        }

        return [
          200,
          {
            message: "Coupon updated successfully",
            coupons: this.coupons,
          },
        ];
      });

    this.mock.onPost(UrlService.admin + "/users/add").reply((config) => {
      console.log("Mocked POST request to add user:", config.data);

      const newUser = JSON.parse(config.data);
      console.log("Im going to push the user into the users list" + newUser); // arrives as object...
      this.users.push(newUser);

      return [
        201,
        {
          message: "User added successfully",
          users: this.users,
        },
      ];
    });

    this.mock.onGet("/admin/users").reply(200, {
      users: this.users,
    });
    console.log("this is the users list " + this.users);
  }

  getCoupons() {
    return axios
      .get("/admin/coupons")
      .then((response) => response.data.coupons);
  }

  getUsers() {
    console.log("this is the users list ------- " + this.users);
    return axios.get("/admin/users").then((response) => response.data.users);
  }

  resetMocks() {
    this.mock.reset();
    this.coupons = [];
  }
}

export default new MockApiService();
