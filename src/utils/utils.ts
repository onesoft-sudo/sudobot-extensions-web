export function clipboardCopy(text: string) {
    if (!navigator.clipboard) {
        return;
    }

    return navigator.clipboard.writeText(text);
}
