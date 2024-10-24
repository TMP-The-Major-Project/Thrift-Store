import { AiFillStar } from "react-icons/ai";

export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3001/products"); // Replace with your actual API endpoint
    const result = await response.json();

    // Map the result to match your desired structure
    const data = result.map(product => ({
      id: product.id,
      img: product.img,
      title: product.title,
      star: <AiFillStar className="rating-star" />,
      reviews: product.reviews,
      prevPrice: product.prevPrice,
      newPrice: product.newPrice,
      company: product.company,
      color: product.color,
      category: product.category,
    }));

    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
};

