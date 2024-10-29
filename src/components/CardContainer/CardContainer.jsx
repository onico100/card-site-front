import React, { useState } from "react";
import Card from "../Card/Card.jsx";
import styles from "./CardContainer.module.css";

const CardContainer = () => {
  const [cards, setCards] = useState([
    { id: 1, text: "Text a" },
    { id: 2, text: "Text b" },
    { id: 3, text: "Text c" },
    { id: 4, text: "Text d" },
  ]);

  const addCard = () => {
    const newCard = {
      id: Date.now(),
      text: `Text ${String.fromCharCode(97 + cards.length)}`,
    };
    setCards([...cards, newCard]);
  };

  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className={styles.cardContainer}>
      {cards.map((card) => (
        <Card key={card.id} onDelete={() => deleteCard(card.id)} />
      ))}
      <button className={styles.addButton} onClick={addCard}>
        Add
      </button>
    </div>
  );
};

export default CardContainer;
