import React, { useState } from "react";
import Styles from "./Card.module.css";
import { FaTrashAlt } from "react-icons/fa";

const colors = ["color1", "color2", "color3", "color4"];

const Card = ({
  text: initialText,
  color: initialColor,
  onDelete,
  onUpdate,
}) => {
  const [color, setColor] = useState(initialColor);
  const [text, setText] = useState(initialText);
  const [isEditing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(initialText);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleTextClick = () => setEditing(true);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    setText(inputValue);
    onUpdate({ text: inputValue, color });
    setEditing(false);
  };

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
    onUpdate({ text, color: selectedColor });
    setPickerVisible(false);
  };

  const toggleColorPicker = () => setPickerVisible((prev) => !prev);

  return (
    <div className={`${Styles.card} ${Styles[color]}`}>
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
            <div
              key={colorOption}
              className={`${Styles.colorCircle} ${Styles[colorOption]}`}
              onClick={() => handleColorChange(colorOption)}
              title={colorOption.replace("color", "Color ")}
            ></div>
          ))}
        </div>
      )}
      <button onClick={onDelete} className={Styles.delete}>
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default Card;
