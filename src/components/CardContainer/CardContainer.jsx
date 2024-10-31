// CardContainer.jsx
import React, { useState, useEffect } from "react";
import Card from "../Card/Card.jsx";
import styles from "./CardContainer.module.css";
import { getAllCards, createCard, updateCard, deleteCard } from "../../service";

const CardContainer = () => {
  const [cards, setCards] = useState([]);
  const [pinnedCards, setPinnedCards] = useState([]);
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

    // Load pinned cards from localStorage on component mount
    const loadPinnedCards = () => {
      const storedPinned = JSON.parse(localStorage.getItem("pinnedCards"));
      console.log("lodd" + storedPinned);
      if (storedPinned) {
        setPinnedCards(storedPinned);
        console.log("lodd" + storedPinned);
      }
    };

    fetchCards();
    loadPinnedCards();
  }, []);

  const addCard = async () => {
    setSearchTerm("");
    try {
      const newCard = { text: "enter text..." };
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
      setPinnedCards(pinnedCards.filter((pinnedId) => pinnedId !== id)); // Remove from pinned if deleted
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handlePinCard = (id) => {
    setPinnedCards((prev) => {
      let updatedPinnedCards;
      if (prev.includes(id)) {
        updatedPinnedCards = prev.filter((pinnedId) => pinnedId !== id);
      } else {
        updatedPinnedCards = [id, ...prev];
      }
      localStorage.setItem("pinnedCards", JSON.stringify(updatedPinnedCards));
      return updatedPinnedCards;
    });
  };

  const filteredCards = cards.filter((card) =>
    card.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinned = filteredCards.filter((card) => pinnedCards.includes(card.id));
  const unpinned = filteredCards.filter(
    (card) => !pinnedCards.includes(card.id)
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
      {pinned.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          text={card.text}
          backgraund={card.backgraund}
          onDelete={() => handleDeleteCard(card.id)}
          onUpdate={handleUpdateCard}
          onPin={handlePinCard} // Pass onPin function
          isPinned={true}
        />
      ))}
      {unpinned.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          text={card.text}
          backgraund={card.backgraund}
          onDelete={() => handleDeleteCard(card.id)}
          onUpdate={handleUpdateCard}
          onPin={handlePinCard} // Pass onPin function
          isPinned={false}
        />
      ))}
      <button className={styles.addButton} onClick={addCard}>
        +
      </button>
    </div>
  );
};

export default CardContainer;
