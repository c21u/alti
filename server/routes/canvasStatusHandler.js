export default (canvas) => async () => {
  try {
    const accounts = canvas.api.get("/accounts");
    return accounts ? { status: "success" } : { status: "error" };
  } catch (err) {
    return { status: "error", message: err.message };
  }
};
