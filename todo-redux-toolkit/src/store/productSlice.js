import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "./../api/ApiAxios";
const initialState = {
  products: [],
  error: "",
  status: "",
};

export const fetchDataProduct = createAsyncThunk(
  "product/fetchDataProduct",
  async (params, thunkApi) => {
    // dispatch other action use : thunkApi.dispatch()
    try {
      const data = await callApi("products", "GET", null);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
// export const deleteProduct = createAsyncThunk(
//   "product/deleteProduct",
//   async (params, thunkApi) => {
//     try {
//       //   thunkApi.dispatch(deleteProductReducer(params));
//       const data = await callApi(`products/${params}`, "DELETE", null);
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteProduct(state, action) {
      return state?.products?.filter((x) => x.id !== action.payload);
    },
    toogleStatus: (state, action) => {
      const { status, record } = action.payload;
      state.products.forEach((item, index) => {
        if (item.id === record.id) {
          item.status = !status;
        }
      });
    },
  },

  extraReducers: {
    [fetchDataProduct.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchDataProduct.fulfilled]: (state, action) => {
      state.status = "success";
      state.products = action.payload;
    },
    [fetchDataProduct.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export const {
  getDataProducts,
  deleteProduct,
  toogleStatus,
} = productSlice.actions;
export default productSlice.reducer;
