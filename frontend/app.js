import API from "../api";

const fetchPoems = async () => {
  try {
    const { data } = await API.get("/api/poems");
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};