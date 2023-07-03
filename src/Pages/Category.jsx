import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../utilities/AxiosInstance";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [editCategory, setEditCategory] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [initialValues, setInitialValues] = useState({
    category: "",
    category_name: ""
  });
  const [editInitialValues, setEditInitialValues] = useState({
    category: "",
    category_name: ""

  });

  const Data = useRef(null);

  useEffect(() => {
    axiosInstance
      .get("/category")
      .then((res) => setCategory(res))
      .catch((err) => console.error(err));
  }, []);

  const deleteCategory = async (id) => {
    try {
      await axiosInstance.delete(`/category/${id}`);
      setCategory(category.filter((category) => category._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editClicked = (x) => {
    setEditCategory(true);
    setCurrentCategory(x);
    setInitialValues(x);
    // setEditCategory(x);
    // setInitialValues({
    //   category: x.category,
    //   category_name: x.category_name
    // });
  };

  const handleEdit = async (values, actions) => {
    try {
      const updatedCat = { ...editCategory, ...values };
      const res = await axiosInstance.put(
        `/category/${updatedCat._id}`,
        updatedCat
      );
      const updatedCategory = category.findIndex((cat) =>
        cat._id === updatedCat._id ? updatedCat : cat
      );
      category[updatedCategory] = res.data.category;
      category[updatedCategory] = res.data.category_name;

      setCategory([...category]);
      setEditInitialValues({
        category: "",
        category_name: "",
      })
      setEditCategory(false);
        
      
    } catch (error) {
      console.error(error);
    }
    await axiosInstance.get("/category")
      .then((res) => setCategory(res))
      .catch((err) => console.error(err));
    // setInitialValues([]);
  };

  const addData = async (values, actions) => {
    try {
      console.log(values);
      const res = await axiosInstance.post("/category", values);
      console.log(res);
      const newCategory = res;
      setCategory([...category, newCategory]);
      
      actions.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-5 w-full">
      <h1 className="text-2xl text-blue-950 font-medium ">Categories</h1>
      <Formik
        initialValues={editCategory ? editInitialValues : initialValues}
        validate={(values) => {
          if (!editCategory) {
            console.log(values, "b");
            const errors = {};
            if (!values.category) {
              errors.category = "Required Category...";
            }
            if (!values.category_name) {
              errors.category_name = "Required Category_name....";
            }

            return errors;
          }
        }}
        onSubmit={async (values, actions) => {
          try {
            console.log(values);
            if (editCategory) {
              const res = await axiosInstance.put(
                `/category/${currentCategory._id}`,
                values
              );
              console.log(currentCategory);
              console.log(res, "b");

              const index = category.findIndex(
                (c) => c._id === currentCategory._id
              );
              console.log(category[index], "o");
              category[index].category = res.data.category !== "" ? res.data.category : currentCategory.category;
              category[index].category_name = res.data.category_name  !== "" ? res.data.category_name : currentCategory.category_name;

              setCategory([...category]);
              actions.setStatus({ success: true });
              actions.setSubmitting(false);              
              setEditInitialValues({
                category: "",
                category_name: "",
              })
              setEditCategory(false);
              setCurrentCategory(null);
            } else {
              const res = await axiosInstance.post("/category", values);
              console.log(res);
              const newCategory = res;
              setCategory([...category, newCategory]);
            }

            actions.resetForm();
          } catch (error) {
            console.error(error);
          }
          axiosInstance
            .get("/category")
            .then((res) => setCategory(res))
            .catch((err) => console.error(err));
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          actions,
          errors,
          touched
        }) => (
          <Form
            className="flex mt-5 gap-6 items-center"
            onSubmit={handleSubmit}
            ref={Data}
          >
            <div className="flex flex-col">
              <input
                name="category"
                value={values.category || initialValues.category}
                onChange={handleChange}
                placeholder="Add Category"
                className="p-2 border-2  border-gray-700 rounded-2xl w-64"
                type="text"
              />
              {!editCategory ?( errors.category && touched.category ? (
                <p className="text-sm text-red-600">{errors.category}</p>
              ) : null) : [] }
            </div>
            <div className="flex flex-col">
              <input
                name="category_name"
                value={values.category_name || initialValues.category_name}
                onChange={handleChange}
                placeholder="Add Category Name"
                className="p-2 border-2  border-gray-700 rounded-2xl w-64"
                type="text"
              />
              {errors.category_name && touched.category_name ? (
                <p className="text-sm ml-3  text-red-600">
                  {errors.category_name}
                </p>
              ) : null}
            </div>

            <button className="p-2 px-6 rounded-full bg-blue-950  text-white">
              Add
            </button>
          </Form>
        )}
      </Formik>
      <div className="w-full mt-6">
        {category.length > 0 ? (
          <table
            style={{ width: "100%", borderCollapse: "collapse" }}
            className="border border-collapse   border-blue-950 text-blue-950 "
          >
            <tr>
              <th className="border border-blue-950 "></th>
              <th className="border border-blue-950  ">Category</th>
              <th className="border border-blue-950  ">Category Name</th>
              <th className="border border-blue-950 ">Action</th>
            </tr>
            {category.map((x, i) => (
              <tr key={x._id}>
                <td className="border border-blue-950 ">{++i}</td>
                <td className="border border-blue-950 ">{x.category}</td>
                <td className="border border-blue-950 ">{x.category_name}</td>
                
                <td className="border border-blue-950  gap-2 flex p-2">
                  <button
                    className="p-2 px-6 rounded-full bg-blue-950  text-white"
                    onClick={() => editClicked(x)}
                  >
                    Edit
                  </button>
                  <button
                    className="p-2 px-6 rounded-full bg-blue-950  text-white"
                    onClick={() => deleteCategory(x._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}{" "}
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default Category;
