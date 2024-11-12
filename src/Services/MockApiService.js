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

      const { email, password } = JSON.parse(config.data);

      if (email === "admin@gmail.com" && password === "1234") {
        return [
          200,
          {
            token: "mocked-jwt-token",
            id: 1,
            message: "Login successful",
          },
        ];
      }
      const user = this.users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        return [
          200,
          {
            token: "mocked-jwt-token-for-" + email,
            id: user.id || 2,
            message: "Login successful",
          },
        ];
      }

      console.log("return invalid credentials ");

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
        const match = config.url.match(/\/coupons\/(\d+)\/delete/);
        const couponId = match ? match[1] : null;

        console.log(
          "Mocked DELETE request to delete coupon with ID:" + couponId
        );

        this.coupons = this.coupons.filter((coupon) => coupon.id !== couponId);

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

        const match = config.url.match(/\/coupons\/(\d+)\/update/);
        const couponId = match ? parseInt(match[1], 10) : null;

        const updatedCouponData = JSON.parse(config.data);
        const getCouponById = this.coupons.find(
          (coupon) => coupon.id === updatedCouponData
        );
        console.log(
          "Mocked PUT request to update coupon with ID:",
          getCouponById
        );
        console.log("Updated coupon data:", updatedCouponData);

        let couponFound = false;
        this.coupons = this.coupons.map((coupon) => {
          if (coupon.id === couponId) {
            couponFound = true;
            return { ...coupon, ...updatedCouponData };
          }
          return coupon;
        });

        if (!couponFound) {
          return [404, { message: "Coupon not found" }];
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
      console.log("Im going to push the user into the users list" + newUser);
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
