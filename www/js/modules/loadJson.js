export default async function loadJson(file) {
    const response = await fetch(file);
    const json = await response?.json();
    return json
}