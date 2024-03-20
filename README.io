// How To Run Project
Backend :-
MineCart :- npm i 
          npm start
Frontend :- npm i 
          npm run dev


Backend functionality
step 1 : Create Server and configure DB ✅

MODAL VIEW AND CONTROLLER
---------------------------------------------

step 2 :-  design schema models
   User , ✅
   Product, ✅
   ProductType, ✅
   Vendor ✅

step 3 : - routes 
   
   methods
    post      localhost:5000/api/v1/login  ✅
    post      localhost:5000/api/v1/register ✅
    crud      localhost:5000/api/v1/products ✅
    get       localhost:5000/api/v1/logout ✅
    get       localhost:5000/api/v1/me load user when login customer ✅
    crud      localhost:5000/api/v1/users ✅
delete/put    localhost:5000/api/v1/users/:id ✅
get/post      localhost:5000/api/v1/product-type ✅
get/post      localhost:5000/api/v1/vendors ✅
put/delete    localhost:5000/api/v1/vendors/:id ✅

step 4 controllers 
  Protected Route 
            createProducts, ✅
            getProduct ✅
            getAllProducts, ✅
            updateProducts, ✅
            deleteProduct ✅
            myProfile ✅
            getAllUsers ✅
            updateProfile ✅
            updatedPassword ✅
      Admin Roles ["admin","owner"]
       default roles "customer"
               admin
               owner
    middleware restrictToAdmin  ✅
               protected route for products 

 Authenticate User
  create product ✅
  delete product ✅
  udated product ✅
  get products  ✅
  get all product ✅
  get single product ✅



Frontend Functionality

npm i react-router-dom @reduxjs/toolkit react-redux ✅

Basic Layout for our minecart application ✅

Lazy Loading ✅
Code Splitting ✅
follow good practice for Folder Structure ✅


components :=>
          Header ✅
          Carasol - Progress
          Products Desplay - Progress
          Shoping Cart Details - Progress 
          Footer
          Loading ✅
          ShowHidePassword feature ✅
         
user can see this pages
        Login  ✅
        Register ✅
        Cart 
        search product => Debounce feature
        Error ✅
                
admin page
        Dashboard 
        Products 
        Customers 
        Transaction 

admin management

    newproduct
    productmanagement
    transactionmanagement

    // All api call 
      apicall.jsx ✅
     
     // use lazy suspend for dynamic load our components

     Protected Route components ✅
      admin 
      Owener  
      customer 
     
Setup for state management Redux Toolkit ✅

create store and configure ✅
create slices for 
 loadUser ✅
 loginUser ✅
 registerUser ✅
 LogoutUser ✅

packages install :
   react router dom ✅ for routing
   react-bootstrap ✅ for designing
   react-alert ✅ for showing error messages
   react-redux ✅ bride between ui and redux connect
   @reduxjs/toolkit ✅





   
