export const getProducts = async () => {
    return [
        {
            products_img: "https://source.unsplash.com/600x400/?tea",
            products_name: "Çay",
            products_price: 9.75,
            products_category: "hot"
        },
        {
            products_img: "https://source.unsplash.com/600x400/?cola",
            products_name: "Kola",
            products_price: 15.00,
            products_category: "cold"
        },
        {
            products_img: "https://source.unsplash.com/600x400/?cake",
            products_name: "Pasta",
            products_price: 45.50,
            products_category: "dessert"
        },
        {
            products_img: "https://source.unsplash.com/600x400/?burger",
            products_name: "Burger",
            products_price: 89.99,
            products_category: "meal"
        },
        {
            products_img: "https://source.unsplash.com/600x400/?coffee",
            products_name: "Kahve",
            products_price: 25.25,
            products_category: "hot"
        }
    ];
};

export const getUsers = async () => {
    return [
        {
            users_name: "fatih",
            users_password: "123456",
            users_role: "admin"
        },
        {
            users_name: "ahmet",
            users_password: "pass123",
            users_role: "customer"
        },
        {
            users_name: "ayse",
            users_password: "test123",
            users_role: "customer"
        },
        {
            users_name: "mehmet",
            users_password: "qwerty",
            users_role: "staff"
        },
        {
            users_name: "zeynep",
            users_password: "abc123",
            users_role: "customer"
        }
    ];
};