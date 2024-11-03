import { useCursorify } from "@cursorify/react";
import spacePointer from "../assets/space-pointer.png";
import spacePointerClick from "../assets/space-pointer-click.png";
import pointer from "../assets/pointer.png";

const CustomCursor = () => {
  const { mouseState, style, disabled } = useCursorify(); // Ensure 'disabled' is destructured

  return (
    <div
      style={{
        transform: "translate(-50%, -30%)", // Center the cursor icon
        position: "absolute",
        pointerEvents: "none", // prevents blocking interactions with underlying elements
      }}
    >
      {(() => {
        if (disabled)
          return (
            <img
              src={spacePointer}
              style={{ width: 100, height: 100 }}
              alt="Disabled Cursor"
            />
          );
        if (mouseState === "mouseDown")
          return (
            <img
              src={spacePointerClick}
              style={{ width: 100, height: 100 }}
              alt="Mouse Down"
            />
          );

        return (
          <img
            src={spacePointer}
            style={{ width: 100, height: 100 }}
            alt="Default Cursor"
          />
        );
      })()}
    </div>
  );
};

export default CustomCursor;
