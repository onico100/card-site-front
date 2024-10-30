import React, { useState, useEffect } from "react";
import Styles from "./Card.module.css";
import { FaTrashAlt } from "react-icons/fa";

const colors = [
  "color1",
  "color2",
  "color3",
  "color4",
  "color5",
  "color6",
  "color7",
  "color8",
  "color9",
];

const Card = ({
  id,
  text: initialText,
  backgraund: initialColor,
  onDelete,
  onUpdate,
}) => {
  const [backgraund, setColor] = useState(initialColor);
  const [text, setText] = useState(initialText);
  const [isEditing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(initialText);
  const [isPickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    setText(initialText);
    setColor(initialColor);
    setInputValue(initialText);
  }, [initialText, initialColor]);

  const handleTextClick = () => setEditing(true);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    const updatedData = { text: inputValue, backgraund };
    setText(inputValue);
    onUpdate(id, updatedData); // Pass ID and updated data to onUpdate
    setEditing(false);
  };

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
    onUpdate(id, { text, backgraund: selectedColor });
    setPickerVisible(false);
  };

  const toggleColorPicker = () => setPickerVisible((prev) => !prev);

  return (
    <div className={`${Styles.card} ${Styles[backgraund]}`}>
      {isEditing ? (
        <input
          type="text"
          className={Styles.editableText}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
        />
      ) : (
        <div onClick={handleTextClick} className={Styles.text}>
          <p>{text}</p>
        </div>
      )}
      <button onClick={toggleColorPicker} className={Styles.toggleButton}>
        🎨
      </button>
      {isPickerVisible && (
        <div className={Styles.colorOptions}>
          {colors.map((colorOption) => (
            <button
              key={colorOption}
              className={`${Styles.colorCircle} ${Styles[colorOption]}`}
              onClick={() => handleColorChange(colorOption)}
              title={`Select ${colorOption.replace("color", "Color ")}`}
              aria-label={`Select ${colorOption.replace("color", "Color ")}`}
            ></button>
          ))}
        </div>
      )}
      <button onClick={onDelete} className={Styles.delete} aria-label="Delete">
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default Card;
