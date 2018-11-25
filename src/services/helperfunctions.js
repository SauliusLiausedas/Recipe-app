export default class {
    static cloneArray(array) {
        return JSON.parse(JSON.stringify(array));
    }
}