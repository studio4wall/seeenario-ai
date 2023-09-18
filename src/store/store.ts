import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {

    },
    devTools: true,
});

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;