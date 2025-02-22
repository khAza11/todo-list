import React, { useState } from "react";
import axios from "axios";
import "./Right.css";
import { RiArchiveLine } from "react-icons/ri";
import CustomDate from "../Date/Date";

const Right = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (!title || !message) {
      alert("Заполните все поля!");
      return;
    }

    const newData = {
      title,
      message,
      date: new Date().toLocaleString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/messages",
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Данные успешно сохранены!");
        setTitle("");
        setMessage("");
      } else {
        alert("Ошибка при сохранении данных!");
      }
    } catch (error) {
      console.error("Ошибка: ", error);
      alert("Произошла ошибка при отправке данных!");
    }
  };

  const handleDelete = () => {
    setTitle("");
    setMessage("");
  };

  return (
    <div className="right">
      <div className="right__wrapper">
        <div className="right__header">
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="right__hero">
          <div className="right__inp-flex">
            <CustomDate />
          </div>
        </div>
        <div className="right__inf">
          <textarea
            placeholder="Сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="right__btn-flex">
          <button className="right__btn" onClick={handleSave}>
            Сохранить
          </button>
          <button className="right__btn" onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Right;
