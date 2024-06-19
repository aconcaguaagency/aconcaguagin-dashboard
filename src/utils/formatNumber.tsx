export function formatNumberWithDot(number: number) {
    return number.toLocaleString('en-US').replace(/,/g, '.');

}
