import { ChromePicker, CirclePicker } from "react-color";

import { colors } from "./types";
import { rgbaObjectToString } from "./Editor.helper";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formateedValue = rgbaObjectToString(color.rgb);
          onChange(formateedValue);
        }}
        className="border rounded-lg"
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formateedValue = rgbaObjectToString(color.rgb);
          onChange(formateedValue);
        }}
      />
    </div>
  );
};
