import React from "react";
import { IconButton } from "@mui/material";
import Picker from "@emoji-mart/react";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";

import s from "./EmojiButton.module.scss";

type EmojiButtonProps = {
  addEmoji: React.Dispatch<React.SetStateAction<string>>;
};

const EmojiButton: React.FC<EmojiButtonProps> = ({ addEmoji }) => {
  const [openPicker, setOpenPicker] = React.useState(false);

  const toggle = React.useCallback(() => {
    setOpenPicker((prev) => !prev);
  }, []);

  const handleSelectEmoji = ({ native }: { native: string }) => {
    addEmoji((prev: string) => `${prev}${native}`);
  };

  return (
    <div className={s.emojiButton}>
      <IconButton onClick={toggle}>
        <AddReactionOutlinedIcon fontSize="large" color="primary" />
      </IconButton>

      <div className={s.emojiButton__emojiPicker}>
        {openPicker && (
          <Picker
            locale="ru"
            previewPosition="none"
            skinTonePosition="none"
            navPosition="bottom"
            onEmojiSelect={handleSelectEmoji}
          />
        )}
      </div>
    </div>
  );
};

export default EmojiButton;
