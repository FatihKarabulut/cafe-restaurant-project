

//// Product Query

/*
	products_id serial primary key,
	products_img  text not null,
	products_name varchar(500) not null,
	products_price numeric(10,2)  check(products_price > 0) not null,
	products_category varchar(50) not null check(products_category in ('hot','cold','dessert','meal'))

 */
export const querySaveProduct = `INSERT INTO products(products_img,products_name,products_price,products_category)
                                VALUES($1,$2,$3,$4)`;

export const queryFindByCategory = `SELECT * FROM products WHERE products_category = $1 `
export const queryFindByProductName = `SELECT * FROM products WHERE products_name = $1 `

export const queryFindByProducts = `SELECT * FROM products`

export const queryUpdatePrice = `UPDATE products SET products_price = $1 WHERE  products_name = $2`

export const queryDeleteProduct = `TRUNCATE TABLE products RESTART IDENTITY`

export const queryDeleteByName = `DELETE FROM products WHERE products_name = $1 `



/// Users Query
/*
users_id serial primary key not null,
	users_name varchar(200) not null,
	users_password varchar(500) not null,
	users_role varchar(100) not null
 */
export const querySaveUsers = `INSERT INTO users(users_name,users_password,users_role)
                              VALUES($1,$2,$3)`

export const queryUpdateUsersPassword = `UPDATE users set users_password = $1 where users_name = $2 `

export const queryUpdateUsersNameAndPassword = `UPDATE users set users_name = $1 ,users_password = $2 where users_name = $3 `

export const queryFindByName = `SELECT * FROM users WHERE users_name = $1 `

export const queryDeleteByUserName = `DELETE FROM users where users_name = $1`
export const queryDeleteByUser = `TRUNCATE TABLE users RESTART IDENTITY`






export default {querySaveProduct,queryFindByCategory,queryFindByProducts,queryFindByProductName,queryUpdatePrice,
    deleteProduct: queryDeleteProduct,queryDeleteByName,
    queryUpdateUsersPassword,queryUpdateUsersNameAndPassword,
    queryFindByName,querySaveUsers,queryDeleteByUserName,queryDeleteByUser}






