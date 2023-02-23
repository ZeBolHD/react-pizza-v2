import React from "react";
import axios from "axios";
import { Params, useNavigate, useParams } from "react-router-dom";

export default function FullPizza() {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63b5a40958084a7af39b6282.mockapi.io/items/${id}`
        );
        document.title = data.title;
        setPizza(data);
      } catch (error) {
        alert("Такой пиццы нет в нашем магазине.");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="pizzaImage" />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} rub</h4>
    </div>
  );
}
