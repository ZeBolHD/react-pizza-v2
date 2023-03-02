import React from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

interface pizzaState {
  imageUrl: string;
  title: string;
  price: number;
}

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<pizzaState>();
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
    return <>Загрузка...</>;
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="pizzaImage" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} rub</h4>
      <Link to="/">
        <button className="button button--outline button-add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
