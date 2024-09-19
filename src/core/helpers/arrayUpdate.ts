export default function <T>(array: T[], replace: T, predicate: (item: T) => boolean): T[] {
    const index = array.findIndex(predicate);
    
    if (index >= 0) {
        array[index] = replace;
    };

    return array;
}