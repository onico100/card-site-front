import React, { useState } from "react";
import Card from "../Card/Card.jsx";
import styles from "./CardContainer.module.css";

const CardContainer = () => {
  const [cards, setCards] = useState([
    { id: 1, text: "Text a", color: "color1" },
    { id: 2, text: "Text b", color: "color2" },
    { id: 3, text: "Text c", color: "color3" },
    { id: 4, text: "Text d" + "a", color: "color4" },
  ]);

  const addCard = () => {
    const newCard = {
      id: Date.now(),
      text: `Text ${String.fromCharCode(97 + cards.length)}`,
      color: "color1",
    };
    setCards([...cards, newCard]);
  };

  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const updateCard = (id, updatedCard) => {
    setCards(cards.map((card) => (card.id === id ? updatedCard : card)));
  };

  return (
    <div className={styles.cardContainer}>
      {cards.map((card) => (
        <Card
          key={card.id}
          text={card.text}
          color={card.color}
          onDelete={() => deleteCard(card.id)}
          onUpdate={(updatedCard) => updateCard(card.id, updatedCard)}
        />
      ))}
      <button className={styles.addButton} onClick={addCard}>
        +
      </button>
    </div>
  );
};

export default CardContainer;
