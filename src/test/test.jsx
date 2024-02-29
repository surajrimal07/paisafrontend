import { render, screen } from '@testing-library/react';
import axios from "axios";
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import login_mock from "../mock/login_mock";
import App from './App';


const baseURL = "http://localhost:5000";

describe('App Routes', async () => {
  it('renders homepage route', () => {
    render(
        <App />
    );
    expect(screen.getByText('Unique')).toBeInTheDocument();
  });

  it('renders login route', async () => {
    render(
      <BrowserRouter initialEntries={['/login']}>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it("Login Should Work", async () => {
    const response = await axios.post(`${baseURL}/api/login`, login_mock);
    expect(response.status).toEqual(200);
    expect(response.data.success).toEqual(false);
  });
})



// //login
// import axios from "axios";
// import contact_mock from "../mock/contact_mock";
// import login_mock from "../mock/login_mock";
// import products_mock from "../mock/products_mock";
// import user_mock from "../mock/user_mock";
// const baseURL = "http://localhost:5000";

// describe("API Testing", () => {

//   //login
//   it("Login Should Work", async () => {
//     const response = await axios.post(`${baseURL}/api/user/login`, login_mock);
//     expect(response.status).toEqual(200);
//     expect(response.data.success).toEqual(false);
//   });

//   //fetch all products and match each productname with the mock data
//   it("Fetch all products", async () => {
//     //fetch all products,send request
//     const response = await axios.get(`${baseURL}/api/product/get_products`);
//     expect(response.status).toEqual(200);
//     expect(response.data.products).toBeDefined();

//     //matching ech product name with mock data
//     response.data.products.forEach((individualProduct, index) => {
//       expect(individualProduct.productName).toEqual(
//         products_mock[index].productName
//       );
//     });
//   });

//   it("Fetch all contact", async () => {
//     // Fetch all contact, send request
//     const response = await axios.get(`${baseURL}/api/admin/getAllContact`);
//     expect(response.status).toEqual(200);
//     expect(response.data.data).toBeDefined();

//     // Matching each product name with mock data
//     response.data.data.forEach((data, index) => {
//       expect(data.email).toEqual(contact_mock[index].email);
//     });
//   });

//   // it("Fetch all contact", async () => {
//   //   // Fetch all contact, send request using axios.get
//   //   const response = await axios.get(`${baseURL}/api/admin/getAllContact`);
//   //   expect(response.status).toEqual(200);
//   //   expect(response.data.data).toBeDefined();

//   //   // Assuming the structure of contact_mock is an array of objects
//   //   // const expectedContacts = contact_mock.map(contact => contact.email);

//   //   // Matching each email with mock data
//   //   response.data.data.forEach((data, index) => {
//   //     expect(data.email).toEqual(expectedContacts[index]);
//   //   });
//   // });


//   // fetch all user
//   it("Fetch all user", async () => {
//     //fetch all products,send request
//     const response = await axios.get(`${baseURL}/api/admin/getAllUser`);
//     expect(response.status).toEqual(200);
//     expect(response.data.data).toBeDefined();

//     //matching ech product name with mock data
//     response.data.data.forEach((data, index) => {
//       expect(data.data).toEqual(
//         user_mock[index].data
//       );
//     });
//   });





//   // /api/admin/getUser
//   it("Fetch all user in admin dashboard ", async () => {
//     //fetch all products,send request
//     const response = await axios.get(`${baseURL}/api/admin/getUser`);
//     expect(response.status).toEqual(200);
//     expect(response.data.data).toBeDefined();

//     //matching ech product name with mock data
//     response.data.data.forEach((data, index) => {
//       expect(data.data).toEqual(
//         user_mock[index].data
//       );
//     });
//   });

//   it("Create Contact API", async () => {
//     const contact = {
//       // provide contact data here
//       "name": "mina",
//       "email": "mina@ail.com",
//       "message": "Helloa mina",
//     };

//     const response = await axios.post(`${baseURL}/api/admin/createContact`, contact);
//     expect(response.status).toEqual(200);
//     // Additional assertions based on the expected behavior of your API
//   });


//   it("Create User API", async () => {
//     const user = {
//       // provide user data here
//       firstName: "my name",
//       lastName: "last name",
//       email: "email", // Fix the typo here
//       password: "123",
//     };

//     const response = await axios.post(`${baseURL}/api/user/create`, user);
//     expect(response.status).toEqual(200);
//     // Additional assertions based on the expected behavior of your API
//   });




//   it("Delete Contact API", async () => {
//     const contactId = "65c5cbb077a00e4a4a9a1fce"; // provide a valid contact ID
//     const response = await axios.get(`${baseURL}/api/admin/getAllContact`);
//     expect(response.status).toEqual(200);

//   });

//   it("Delete User API", async () => {
//     const userId = "65cee66595f126518415b7b1"; // provide a valid user ID
//     const response = await axios.get(`${baseURL}/api/admin/getAllUser`);
//     expect(response.status).toEqual(200);
//     // Additional assertions based on the expected behavior of your API
//   });


// });

