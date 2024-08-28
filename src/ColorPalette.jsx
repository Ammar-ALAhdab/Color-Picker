// eslint-disable-next-line react/prop-types
function ColorPalette({ baseColor, handleToClipBoard }) {
  // Function to generate a random color
  function generateRandomColor() {
    let color = "#";
    let letters = "0123456789ABCDEF";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Function to generate a compatible color palette
  function generateColorPalette() {
    let palette = [];

    // Generate a base color
    let selectedColor = baseColor;
    // Generate three complementary colors
    for (let i = 0; i < 4; i++) {
      let complementaryColor = generateRandomColor();

      // Ensure the complementary color is compatible with the base color
      while (!isCompatibleColor(selectedColor, complementaryColor)) {
        complementaryColor = generateRandomColor();
      }

      palette.push(complementaryColor);
    }

    return palette;
  }

  // Function to check color compatibility based on color difference
  function isCompatibleColor(baseColor, randomColor) {
    let baseColorRGB = hexToRGB(baseColor);
    let randomColorRGB = hexToRGB(randomColor);

    // Calculate the Euclidean distance between baseColor and randomColor
    let distance = Math.sqrt(
      Math.pow(baseColorRGB.r - randomColorRGB.r, 2) +
        Math.pow(baseColorRGB.g - randomColorRGB.g, 2) +
        Math.pow(baseColorRGB.b - randomColorRGB.b, 2)
    );

    // Check if the distance is within a threshold value
    let threshold = 150;
    if (distance < threshold) {
      return false;
    }

    return true;
  }

  // Function to convert hexadecimal color to RGB color
  function hexToRGB(hexColor) {
    let hex = hexColor.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return {
      r: r,
      g: g,
      b: b,
    };
  }

  // Generate a color palette
  let GeneratedColorPalette = generateColorPalette();

  return (
    <div>
      {GeneratedColorPalette.map((generatedColor, index) => (
        <div
          key={index}
          className="flex">
          <div
            className="w-[120px] h-[50px] border-[1px] border-black mb-3 text-white flex items-center justify-center"
            style={{ backgroundColor: generatedColor }}>
            {generatedColor}
          </div>
          <span
            className="cursor-pointer"
            onClick={() => handleToClipBoard("rgp", { hexColor: generatedColor })}>
            📝
          </span>
        </div>
      ))}
    </div>
  );
}

export default ColorPalette;
