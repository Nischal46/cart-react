import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useGetAllProductsQuery } from "../Features/productApi";
import "../App.css";
import { addToChart } from "../Features/cartFeature";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleAddToChart = (el) => {
    dispatch(addToChart(el));

    history("/cart");
  };
  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading. Please wait...</p>
      ) : error ? (
        <p>Error occured..</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="productdata" style={{ margin: "1rem 0" }}>
            {data?.map((el) => (
              <div className="productbox" key={el.id}>
                <h3>{el.name}</h3>
                <img
                  src={el.image}
                  alt={el.name}
                  style={{ width: "200px", height: "180px" }}
                />
                <div className="details" style={{ textAlign: "center" }}>
                  <span>
                    <strong>{el.title}</strong>
                  </span>
                  <span className="price" style={{ paddingTop: "1rem" }}>
                    Price: {el.price}
                  </span>
                </div>
                <button onClick={() => handleAddToChart(el)}>
                  Add to chart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
