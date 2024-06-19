export function formatPrice(num?: number) {
  // Format the number with dot as thousands separator and comma as decimal separator
  let formattedNumber = num?.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Replace dot with a temporary character
  formattedNumber = formattedNumber?.replace(/\./g, '~');

  // Replace comma with dot for the decimal separator
  formattedNumber = formattedNumber?.replace(/,/g, '.');

  // Replace temporary character with comma for the thousands separator
  formattedNumber = formattedNumber?.replace(/~/g, ',');

  // Append the dollar sign
  formattedNumber = "$ " + formattedNumber;

  return formattedNumber;
}