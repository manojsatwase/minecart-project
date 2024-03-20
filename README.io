
Backend functionality
step 1 : Create Server and configure DB

step 2 :-  design schema models
   User ,
   Product,
   ProductType,
   Vendor

step 3 : - routes 
   
   methods
    post   localhost:5000/api/v1/login 
    post   localhost:5000/api/v1/register
    crud   localhost:5000/api/v1/products
                         /api/v1/logout


step 4 controllers 
  Protected Route 
            createProducts,
            getProduct
            getAllProducts,
            updateProducts, 
            deleteProduct


 Authenticate User
  create delete updated product



frontend functionality

npm i react-router-dom @reduxjs/toolkit react-redux

Basic Layout for our minecart application

components :=>
          Header
          Footer
          Loading
         
user can see this pages
        Login 
        Register
        Cart
        search product => Debounce feature
        Error
                
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
      apicall.jsx
     
     // use lazy suspend for dynamic load our components

     Protected Route
      admin
      Owener  
      customer 
     
     
       



   
