export function extractJson(str: string): any | null {
    const jsonStart = str.indexOf('{');
    const jsonEnd = str.lastIndexOf('}');

    if (jsonStart === -1 || jsonEnd === -1) {
        return null;
    }

    const jsonString = str.substring(jsonStart, jsonEnd + 1);

    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Invalid JSON:', error);
        return null;
    }
}