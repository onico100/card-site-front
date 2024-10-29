import React, { useState } from "react";
import Styles from "./Card.module.css";
import { FaPaintBrush } from "react-icons/fa";

const colors = ["color1", "color2", "color3", "color4"];

const Card = ({ onDelete }) => {
  const [color, setColor] = useState("color1");
  const [text, setText] = useState("Enter text");
  const [isEditing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(text);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleTextClick = (event) => {
    if (event.target.tagName !== "SELECT") {
      setEditing(true);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setText(inputValue);
      setEditing(false);
    }
  };

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
    toggleColorPicker();
  };

  const toggleColorPicker = () => {
    setPickerVisible((prev) => !prev); // Toggle visibility
  };

  return (
    <div
      className={`${Styles.card} ${Styles[color]}`}
      onClick={handleTextClick}
    >
      {isEditing ? (
        <input
          type="text"
          className={Styles.editableText}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div>
          <p>{text}</p>
        </div>
      )}
      <button onClick={toggleColorPicker} className={Styles.toggleButton}>
        Choose Color
      </button>
      {isPickerVisible && (
        <div className={Styles.colorOptions}>
          {colors.map((colorOption) => (
            <div
              key={colorOption}
              className={`${Styles.colorCircle} ${Styles[colorOption]}`}
              onClick={() => handleColorChange(colorOption)}
              title={colorOption.replace("color", "Color ")}
            >
              <FaPaintBrush />
            </div>
          ))}
        </div>
      )}
      <button onClick={onDelete} className={Styles.delete}>
        🗑️
      </button>
    </div>
  );
};

export default Card;
