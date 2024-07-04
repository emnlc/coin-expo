interface Props {
  price: number;
}

const CoinPriceFormatter = (props: Props) => {
  const formatPrice = (price: number) => {
    const parts = price.toString().split(".");
    if (parts.length === 1) {
      return price; // If there's no decimal part, return the price as is
    }
    const integerPart = parts[0];
    let decimalPart = parts[1];

    // Find the first non-zero digit in the decimal part
    const firstNonZeroIndex = decimalPart.search(/[1-9]/);
    if (firstNonZeroIndex === -1) {
      return price.toLocaleString("en-US", {
        maximumFractionDigits: 4,
      }); // If no non-zero digit found, return the price fixed to 4 decimals
    }

    // Keep only the first four digits after the first non-zero digit
    decimalPart = decimalPart.slice(0, firstNonZeroIndex + 4);

    return `${parseInt(integerPart).toLocaleString("en-US", {
      maximumFractionDigits: 4,
    })}.${decimalPart}`;
  };

  return formatPrice(props.price);
};

export default CoinPriceFormatter;
