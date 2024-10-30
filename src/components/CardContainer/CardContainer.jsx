import React, { useState, useEffect } from "react";
import Card from "../Card/Card.jsx";
import styles from "./CardContainer.module.css";
import { getAllCards, createCard, updateCard, deleteCard } from "../../service";

const CardContainer = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const fetchedCards = await getAllCards();
        setCards(fetchedCards);
      } catch (error) {
        console.error("Error loading cards:", error);
      }
    };

    fetchCards();
  }, []);

  const addCard = async () => {
    //clear serch
    setSearchTerm("");
    try {
      const newCard = {
        text: "enter text...",
      };
      const createdCard = await createCard(newCard.text);
      setCards([...cards, createdCard]);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };
  const handleUpdateCard = async (id, updatedCard) => {
    try {
      const updatedData = await updateCard(id, updatedCard);
      setCards(cards.map((card) => (card.id === id ? updatedData : card)));
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await deleteCard(id);
      setCards(cards.filter((card) => card.id !== id));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };
  const filteredCards = cards.filter((card) =>
    card.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.cardContainer}>
      <input
        type="text"
        placeholder="Search cards..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchBar}
      />
      {filteredCards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          text={card.text}
          backgraund={card.backgraund}
          onDelete={() => handleDeleteCard(card.id)}
          onUpdate={handleUpdateCard}
        />
      ))}
      <button className={styles.addButton} onClick={addCard}>
        +
      </button>
    </div>
  );
};

export default CardContainer;
