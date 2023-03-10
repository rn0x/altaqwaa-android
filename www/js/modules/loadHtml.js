export default async function loadHtml(file) {
    const response = await fetch(file);
    const text = await response?.text();
    return text
}