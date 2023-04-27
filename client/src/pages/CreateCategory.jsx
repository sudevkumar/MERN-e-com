import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import AminMenu from "./AminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../components/Form/CategoryForm";
import { Button, Modal } from "antd";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  // handle Form
  const addCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/v1/category/create-category",
        {
          name,
        }
      );

      setName("");

      if (data?.status) {
        toast.success(`${name} is succesfully created!`);
        getAllCategories();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong in input from!");
    }
  };

  // Update category
  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8081/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.status) {
        toast.success(`${updatedName} is succesfully Updated!`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.msg);
      }
      // setVisible(false);
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong in input from!");
    }
  };

  // Delete category
  const deleteCategory = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8081/api/v1/category/delete-single-category/${pId}`
      );
      if (data.status) {
        toast.success(`category is deleted`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
      // setVisible(false);
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong in input from!");
    }
  };

  // Get All Categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8081/api/v1/category/get-all-category"
      );

      // console.log("data", data.category);
      if (data.status) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong in getting categories!");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  console.log("categories", categories);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                addCategory={addCategory}
                value={name}
                setValue={setName}
              />
            </div>
            <div style={{ width: "80%" }}>
              <table className="table" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th scope="col">Category Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories &&
                    categories.map((cat) => (
                      <>
                        <tr>
                          <td key={cat._id}>{cat.slug}</td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(cat.name);
                                setSelected(cat);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => {
                                deleteCategory(cat._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                addCategory={updateCategory}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
