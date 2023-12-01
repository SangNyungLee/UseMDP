export default function IsBackGroundDark(color) {
    if (!color) {
        return false;
    }

    // rgb 숫자변환
    const r = parseInt(color.substring(1, 3), 16) / 255;
    const g = parseInt(color.substring(3, 5), 16) / 255;
    const b = parseInt(color.substring(5, 7), 16) / 255;

    // RGB 중 최소, 최대값 및 둘을 더한 값 계산
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sum = max + min;
    // 명도 계산
    const brightness = sum * 50;
    console.log(color, brightness);
    // return brightness;
    return brightness < 50; // 밝은 경우 true, 어두운 경우 false 반환
}
