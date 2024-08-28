import { useState } from "react";
import ColorPalette from "./colorPalette";

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [imageSrc, setImageSrc] = useState("");

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageSrc(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageSrc(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleImageClick = (event) => {
    const img = event.target;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);

    const pixelData = context.getImageData(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY,
      1,
      1
    ).data;
    const rgbColor = `${pixelData[0]},${pixelData[1]},${pixelData[2]}`;
    const hexColor = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);

    setSelectedColor({ rgbColor, hexColor });
  };

  const handleRemove = () => {
    setImageSrc("");
    setSelectedColor(null);
  };

  const handleToClipBoard = (type, color = selectedColor) => {
    if (type === "rgb") {
      navigator.clipboard.writeText(color.rgbColor);
    } else navigator.clipboard.writeText(color.hexColor);
  };

  const rgbToHex = (r, g, b) => {
    const red = r.toString(16).padStart(2, "0");
    const green = g.toString(16).padStart(2, "0");
    const blue = b.toString(16).padStart(2, "0");
    return `#${red}${green}${blue}`;
  };

  return (
    <>
      <nav className="flex items-center justify-start w-full py-4 px-10 mx-auto">
        <h2 className="text-3xl font-mono">Color Picker</h2>
      </nav>
      <div className="w-full h-full flex flex-wrap justify-between px-10">
        {imageSrc && selectedColor && (
          <div className="flex items-center justify-start flex-col p-2">
            <h3 className="text-lg mb-3">
              Recommended Colors <br /> For Use With{" "}
              <span
                style={{
                  color: selectedColor?.hexColor,
                  border: `1px solid ${selectedColor?.hexColor}`,
                  padding: 4,
                }}>
                {selectedColor?.hexColor}
              </span>
            </h3>
            {selectedColor && (
              <ColorPalette
                baseColor={selectedColor.hexColor}
                handleToClipBoard={handleToClipBoard}
              />
            )}
          </div>
        )}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className=" flex-1 max-w-[720px] h-[520px] border-[5px] border-dashed rounded-lg flex flex-col items-center justify-center overflow-hidden mx-auto">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Uploaded"
              onClick={handleImageClick}
              className="w-full h-full cursor-crosshair "
            />
          ) : (
            <div className="flex items-center justify-center flex-col gap-10 p-4">
              <div className="flex items-center justify-center flex-col text-4xl">
                <span>Drag And Drop Image Here</span>
                <span>Or</span>
                <span>Choose A File:</span>
              </div>
              <div className="w-full flex items-center justify-center">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="cursor-pointer"
                  onChange={handleFileSelect}
                />
              </div>
            </div>
          )}
        </div>
        <div>
          {selectedColor && imageSrc && (
            <>
              <div>
                <h3 className="text-lg">Selected Color:</h3>
                <div
                  className="w-[120px] h-[50px] border-[1px] border-black"
                  style={{ backgroundColor: selectedColor.hexColor }}></div>
                <p className="text-lg my-3">
                  RGB: {selectedColor.rgbColor}{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => handleToClipBoard("rgb")}>
                    📝
                  </span>
                </p>
                <p className="text-lg my-3">
                  HEX: {selectedColor.hexColor}{" "}
                  <span
                    className="cursor-pointer"
                    onClick={() => handleToClipBoard("hex")}>
                    📝
                  </span>
                </p>
                <p></p>
              </div>
              <button
                className="bg-gray-300 block mb-3 hover:bg-gray-200 transition-colors outline-none text-black py-1 px-4 rounded-lg"
                onClick={handleRemove}>
                Remove Img
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ColorPicker;