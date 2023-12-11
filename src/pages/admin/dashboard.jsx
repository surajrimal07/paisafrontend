import React, { useState } from "react";

function AdminDashboard() {
  // make useState
  const [productName,setProductName] = useState("")
  const [productPrice,setProductPrice] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productDescription, setProductDescription] = useState('')


  // make useState from image
  const [productImage,setProductImage] = useState(null)
  const [previewImage,setPreviewImage] = useState(null)

 //function for image upload and preview
 const handleImageUpload = (event) => {
  const file = event.target.files[0]
  setProductImage(file)
  setPreviewImage(URL.createObjectURL(file))
 }

 const handleSubmit = (e) => {
  e.preventDefault()
  console.log(productName,productPrice,productCategory,productDescription,productImage)
 }




  // assign useState for every input box
  return (
    <>
      <div className="m-4">
        <div className="d-flex justify-content-between">
          <h2>Admin Dashboard</h2>
          <button
            type="button"
            class="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Assets
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create new product!
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <label>Product Name</label>
                    {/* name */}
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Product Name"
                      onChange={(e)=>setProductName(e.target.value)}
                    />
                    {/* Price */}
                    <label>Product Price</label>
                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Enter Product Price"
                      onChange={(e)=>{setProductPrice(e.target.value)}}
                    />
                    {/* category */}
                    <label>Product Category</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Product category"
                      onChange={(e)=>{setProductCategory(e.target.value)}}
                    />
                    {/* Description */}
                    <label>Product Description</label>
                   <textarea onChange={(e)=>{setProductDescription(e.target.value)}} name="" id="" cols="3" rows="3" className="form-control" placeholder="enter product description"></textarea>
                   {/* image */}
                   <label>Select a file</label>
                   <input onChange = {handleImageUpload} className="img-fluid rounded object-fit-cover" type="file" />
                   {
                    previewImage && <img src={previewImage} alt="Product Image" />
                   }
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button onClick= {handleSubmit} type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table mt-2">
          <thead className="table-dark">
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product category</th>
              <th>Product Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=3098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={"100"}
                  height={"100"}
                  alt=""
                />
              </td>
              <td>Vans retro 101</td>
              <td>100$</td>
              <td>Shoe</td>
              <td>Skater shoes for comfort</td>
              <td>
                <div
                  class="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <button type="button" class="btn btn-success">
                    Edit
                  </button>
                  <button type="button" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminDashboard;
