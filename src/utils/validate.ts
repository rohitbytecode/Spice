export function isProjectNameValid(name: string) {
    return /^[a-z0-9-]+$/.test(name);
}