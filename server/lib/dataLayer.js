import Canvas from "./canvas.js";

const Data = {};

Data.getAccounts = () => Canvas.get("/accounts");

export default Data;
