import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../utilities/AxiosInstance";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const [initialValues, setInitialValues] = useState({
    product_name: "",
    product_category: "",
    productImage: "",
  });
  const [editInitialValues, setEditInitialValues] = useState({
    product_name: "",
    product_category: "",

  });
  const [image, setImage] = useState({
    productImage: "",
  });

  const [options, setOptions] = useState([{ category_name: "", id: "" }]);

  useEffect(() => {
    axiosInstance
      .get("/product")
      .then((res) => setProduct(res))
      .catch((err) => console.error(err));

    const fetch = () => {
      axiosInstance
        .get("/category")
        .then((res) => {
          setOptions(res);
        })
        .catch((err) => console.error(err));
    };
    fetch();
  }, []);

  const formRef = useRef(null)

  const deleteCategory = async (id) => {
    try {
      await axiosInstance.delete(`/product/${id}`);
      setProduct(product.filter((category) => category._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editClicked = (x) => {
    setEditProduct(x);
    setInitialValues({
      product_name: x.product_name,
      product_category: x.product_category,
    });
  };
  const handleEdit = async (values, actions) => {
    try {
      const updatedCat = { ...editProduct, ...values };
      const res = await axiosInstance.put(
        `/product/${updatedCat._id}`,
        updatedCat
      );

      const updatedCategoryIndex =
        product && product.findIndex((cat) => cat._id == updatedCat._id);
      const updatedProduct = res.data;
      const updatedProductList = [...product];
      updatedProductList[updatedCategoryIndex] = updatedProduct;
      setProduct(updatedProductList);
      actions.setSubmitting(false);
      setEditProduct(null);
      setEditInitialValues({
        product_name: "",
        product_category: "",
        productImage: "",
      });
      axiosInstance
        .get("/product")
        .then((res) => setProduct(res.data))
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
    }

    try {
      const res = await axiosInstance.get("/product");
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }

    setInitialValues([]);
  };

  // const handleEdit = async (values, actions) => {
  //   try {
  //     const updatedCat = { ...editProduct, ...values };
  //     const res = await axiosInstance.put(
  //       `/product/${updatedCat._id}`,
  //       updatedCat
  //     );
  //     const updatedCategory = product.findIndex(
  //       (cat) => cat._id === updatedCat._id
  //     );
  //     product[updatedCategory] = res.data.product_name;
  //     product[updatedCategory] = res.data.product_category;

  //     setProduct([...product]);

  //     setEditProduct(null);
  //     setInitialValues([]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   await axiosInstance
  //     .get("/product")
  //     .then((res) => setProduct(res))
  //     .catch((err) => console.error(err));
  //   setInitialValues([]);
  // };

  // const addData = async (values, actions) => {
  //   try {
  //     console.log(values);
  //     const res = await axiosInstance.post("/product", values , {
  //       headers: {
  //       "Content-Type": "multipart/form-data",}
  //     },);
  //     console.log(res,"CHECKK");
  //     const newProduct = res;
  //     setProduct([...product, newProduct]);
  //     actions.resetForm();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const addData = async (values, actions) => {
    axiosInstance
      .get("/product")
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
    const formData = new FormData();
    formData.append("product_name", values.product_name);
    formData.append("product_category", values.product_category);
    formData.append("productImage", image);
    try {
      const res = await axiosInstance.post("/product", formData);

      const newProduct = res.data;
      setProduct([...product, newProduct]);
      console.log(formData, "productss");
      setImage("");
      setInitialValues({
        product_name: "",
        product_category: "",
      });
      setImage({productImage : ""})
      axiosInstance
        .get("/product")
        .then((res) => setProduct(res))
        .catch((err) => console.error(err));
      actions.resetForm();
    } catch (error) {
      console.error(error);
    }
  };
  // axiosInstance
  //     .get("/product")
  //     .then((res) => setProduct(res.data))
  //     .catch((err) => console.error(err));

  return (
    <div className="m-5 w-full">
      <h1 className="text-2xl text-blue-950 font-medium ">Products</h1>
      <Formik
      innerRef={formRef}
        initialValues={editProduct ? editInitialValues : initialValues}
        validate={(values) => {
          console.log(values, "b");
          const errors = {};
          if (!values.product_name) {
            errors.product_name = "Required Product...";
          }
          if (!values.product_category) {
            errors.product_category = "Required Category_name....";
          }

          return errors;
        }}
        onSubmit={editProduct ? handleEdit : addData}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          resetForm,
          actions,
          errors,
          touched,
        }) => (
          <Form
            className="flex mt-5 gap-6 items-center"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="flex flex-col">
              <input
                name="product_name"
                // value={values.product_name || initialValues.product_name}
                onChange={handleChange}
                value={values.product_name || initialValues.product_name}
                placeholder="Add Product"
                className="p-2 border-2  border-gray-700 rounded-2xl w-64"
                type="text"
              />
              {errors.product_name && touched.product_name ? (
                <p className="text-sm text-red-600">{errors.product_name}</p>
              ) : null}
            </div>
            <div className="flex flex-col">
              <select
                value={
                  values.product_category || initialValues.product_category
                }
                onChange={handleChange}
                name="product_category"
                className="p-2 border-2  border-gray-700 rounded-2xl w-64"
                placeholder="Add Product Category"
              >
                <option>Add Product Category</option>
                {options.map((x) => (
                  <option value={x.category_name} key={x.id}>
                    {x.category_name}
                  </option>
                ))}
              </select>

              {errors.product_category && touched.product_category ? (
                <p className="text-sm ml-3  text-red-600">
                  {errors.product_category}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col">
              <input
                name="productImage"
                onChange={(e) => setImage(e.target.files[0])}
                placeholder="Add Product"
                className="p-2 border-2  border-gray-700 rounded-2xl w-64"
                type="file"
                ref={(x) => formRef.current = x}
              />
              {/* {errors.product_name && touched.product_name ? (
                <p className="text-sm text-red-600">{errors.product_name}</p>
              ) : null} */}
            </div>

            <button
              type="submit"
              className="p-2 px-6 rounded-full bg-blue-950  text-white"
            >
              Add
            </button>
          </Form>
        )}
      </Formik>
      <div className="w-full mt-6">
        {product && product.length > 0 ? (
          <table
            style={{ width: "100%", borderCollapse: "collapse" }}
            className="border border-collapse   border-blue-950 text-blue-950 "
          >
            <tr>
              <th className="border border-blue-950 "></th>
              <th className="border border-blue-950  ">Product</th>
              <th className="border border-blue-950  ">Product Category </th>
              <th className="border border-blue-950  ">Product Image </th>

              <th className="border border-blue-950 ">Action</th>
            </tr>
            {product?.map((x, i) => (
              <tr key={x?._id}>
                <td className="border border-blue-950 ">{i}</td>
                <td className="border border-blue-950 ">{x?.product_name}</td>
                <td className="border border-blue-950 ">
                  {x?.product_category}
                </td>
                <td className="border border-blue-950 ">
                  <img
                    src={`http://localhost:3004/${x?.productImage}`}
                    alt="product"
                    className="rounded-lg h-20  mx-auto my-3"
                  />
                </td>

                <td className="border border-b-0 border-blue-950  gap-2 flex p-4">
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

export default Product;
