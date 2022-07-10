const errorHandler = (message = '', error) => {
  console.log("Cached error:", error);
  alert(message);
};

export { errorHandler };
