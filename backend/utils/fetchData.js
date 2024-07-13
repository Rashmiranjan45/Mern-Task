import axios from "axios";


let productData = []

const fetchData = async () => {
try {
  const response = await axios.get(
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
  );
  productData = response.data;
} catch (error) {
  console.error("Error fetching data:", error.message);
}
};

export { fetchData ,productData};
