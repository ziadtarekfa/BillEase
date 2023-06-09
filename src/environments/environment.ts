import { UserType } from "../app/features/_global/auth/_common/models/user";

export const environment = {
    firebase: {
        projectId: "billease-9f11b",
        appId: "1:17481506580:web:7b4a25e7dc6ed24a882c01",
        databaseURL: "https://billease-9f11b-default-rtdb.firebaseio.com",
        storageBucket: "billease-9f11b.appspot.com",
        apiKey: "AIzaSyB3MSSJmGUvHmaY1yz8D0QDZTsyICx3xyw",
        authDomain: "billease-9f11b.firebaseapp.com",
        messagingSenderId: "17481506580",
    },
    production: false,
    baseUrl: "https://billease-9f11b-default-rtdb.firebaseio.com",
    navRoutes: {
        [UserType.Customer]: [
            {
                path: "/dashboard",
                name: "Dashboard",
                icon: "assets/icons/home.svg",
            },
            {
                path: "/electricity",
                name: "Electricity",
                icon: "assets/icons/lamp.svg",
                color: "#f3783b",
              background: "#ffeade",
            },
            {
                path: "/telephone",
                name: "Telephone",
                icon: "assets/icons/telephone.svg",
              color: "#d3314c",
              background: "#ffeaed"
            },
            {
                path: "/water",
                name: "Water",
                icon: "assets/icons/water.svg",
              color: "#668ae3",
              background: "#e7eeff"

            },
        ],
        [UserType.Admin]: [
            {
                path: "/admin/dashboard",
                name: "Dashboard",
                icon: "assets/icons/home.svg",
            },
            {
                path: "/admin/rates",
                name: "Rates",
                icon: "assets/icons/rates.svg",
            },
            {
                path: "/admin/telephone-configuration",
                name: "Telephone Configs",
                icon: "assets/icons/telephone-admin.svg",
            },
        ],
    },
};
