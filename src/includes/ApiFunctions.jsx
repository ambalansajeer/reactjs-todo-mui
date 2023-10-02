const baseUrl = "api/";
export const postTodoApi = async (url, data = {}) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  const responseData = await response.json();
  return responseData;
};
export const getTodoApi = async (url, data = {}) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    query: JSON.stringify(data),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  const responseData = await response.json();
  return responseData;
};
