const { configureStore } = require("@reduxjs/toolkit");
import reduce from "./slice"
const store=configureStore({
    reducer:{
        Axios:reduce
    }
})
export default store