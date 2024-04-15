import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import swal from "sweetalert";

const engine =
  (Component) =>
  ({ ...props }) => {
    const {
      isLoading,
      data: { data = {} } = {},
      refetch,
    } = useQuery("products", () => axios(process.env.REACT_APP_LAMBDA_URL));

    const deleteProduct = (value) => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover it!",
        icon: "warning",
        dangerMode: true,
        closeOnClickOutside: false,
        buttons: ["Cancel", { text: "Delete Product", closeModal: false }],
      }).then(async (willDelete) => {
        if (willDelete) {
          try {
            await axios({
              url: process.env.REACT_APP_LAMBDA_URL,
              data: JSON.stringify({ barcode: value }),
              method: "DELETE",
            });
            toast.success("Product deleted successfully.");
            refetch();
          } catch (error) {
            toast.success("Error occured!.");
          } finally {
            swal.stopLoading();
            swal.close();
          }
        } else {
          swal.close();
        }
      });
    };

    return (
      <Component
        {...props}
        {...{
          data,
          isLoading,
          deleteProduct,
        }}
      />
    );
  };

export default engine;
