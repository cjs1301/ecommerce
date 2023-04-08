export function stringEmptyCheck(str: string | undefined, defaultStr: string) {
    if (typeof str == 'undefined' || str == null || str == '') str = defaultStr;

    return str;
}
