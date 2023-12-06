export default function IsBackGroundDark(color) {
    if (!color) {
        return false;
    }
    const r = parseInt(color.substring(1, 3), 16) / 255;
    const g = parseInt(color.substring(3, 5), 16) / 255;
    const b = parseInt(color.substring(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sum = max + min;
    
    const brightness = sum * 50;
    return brightness < 50;
}
