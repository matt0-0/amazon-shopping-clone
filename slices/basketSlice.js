import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // if it finds item, it will be greater than zero since it is in the list. if it isnt it will return -1
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        // removes the 1 item at index
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cannot remove product (id: ${action.payload.id}) as it is not in the basket`
        );
      }
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const selectItems = (state) => state.basket.items;

// to go thru items in global store and go thru the items and accumulate the total using the reduce function
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);
export default basketSlice.reducer;
