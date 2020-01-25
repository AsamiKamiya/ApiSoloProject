This was created during my time as a student at Code Chrysalis
# Conveniennce stores Oden API

This was created during my time as a student at Code Chrysalis.
This API is finding conveniennce store's `Oden menu` and recording `purchase`.
Have fun!


## Setting
1. yarn install
```bash
yarn install
```
2. create DB
```bash
yarn migrate
```
3. insert data to table
```bash
yarn seed
```
3. open `http:localhost:3000/api` on your browser.

## How to get data
### user data
* GET
```bash
http:localhost:3000/api/users/
```
* response
```
{
    "id": users.id,
    "name": users.name
}
```
* POST
```bash
http:localhost:3000/api/users/
```
* request
```
{
    "name": users.name
}
```
### store data
* GET
```bash
http:localhost:3000/api/stores/
```
* response
```
{
    "id": stores.id,
    "name": stores.name
}
```
* POST
```bash
http:localhost:3000/api/stores/
```
* request
```
{
    "name": stores.name
}
```
### oden data
* GET
```bash
http:localhost:3000/api/odens/
```
```bash
http:localhost:3000/api/odens/store/:storeid
```
* response
```
{
    "id": odens.id,
    "name": odens.name,
    "price": odens.price,
    "kcal": odens.kcal,
    "store_name": stores.name
}
```
* POST
```bash
http:localhost:3000/api/odens/:storeid
```
* request
```
{
    "name": odens.name,
    "price": odens.price,
    "kcal": odens.kcal
}
```
### purchase data
* GET
```bash
http:localhost:3000/api/purchases/
```
```bash
http:localhost:3000/api/purchases/user/:userid
```
* response
```
{
    "id": purchases.id,
    "username": users.name,
    "odenname": odens.name,
    "count": purchases.count,
    "purchaseDate": purchases.date
}
```
* POST
```bash
http:localhost:3000/api/purchases/user/:userid/odens/:odenid
```
* request
```
{
    "count" : purchases.count
}
```
* PATCH
```bash
http:localhost:3000/api/purchases/:purchaseid
```
* request
```
{
    "user_id": users.id,
    "oden_id": odens.id,
    "count" : purchases.count
}
```
* DELETE
```bash
http:localhost:3000/api/purchases/:purchaseid
```