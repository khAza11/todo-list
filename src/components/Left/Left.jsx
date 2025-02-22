import React, { useEffect, useState } from "react";
import "./Left.css";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineClear } from "react-icons/ai";

const Left = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("http://localhost:5000/messages");
        setCards(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchCards();
  }, []);

  const deleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/messages/${id}`); 
      setCards((prevCards) => prevCards.filter((card) => card.id !== id)); 
      alert("Карточка успешно удалена!");
    } catch (error) {
      console.error("Ошибка при удалении карточки:", error);
      alert("Не удалось удалить карточку.");
    }
  };

  const clearAllCards = async () => {
    try {
      const deleteRequests = cards.map((card) =>
        axios.delete(`http://localhost:5000/messages/${card.id}`)
      );
      await Promise.all(deleteRequests);

      setCards([]);
      alert("Все карточки успешно удалены!");
    } catch (error) {
      console.error("Ошибка при удалении всех карточек:", error);
      alert("Не удалось удалить все карточки.");
    }
  };

  return (
    <>
      <div className="left">
        <div className="left__wrapper">
          <img src="/logo.png" alt="logo" />
          <button className="left__btn" onClick={clearAllCards}>
            Очистить
            <AiOutlineClear />
          </button>
          <div className="left__cards">
            {cards.length > 0 ? (
              cards.map((card) => (
                <div className="left__card" key={card.id}>
                  <div className="left__card-delete">
                    <h2>{card.title}</h2>
                    <button className="left__btn-delete" onClick={() => deleteCard(card.id)}>
                      <MdOutlineDeleteOutline />
                    </button>
                  </div>
                  <div className="left__card-flex">
                    <p>{card.date}</p>
                    <span>{card.message}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="left__error">Нет данных для отображения</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Left;
