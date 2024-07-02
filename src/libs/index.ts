/**
 * Checks if an array is empty
 * @param {Array} arr Array to be tested
 * @returns {Boolean} Boolean value
 */
export const isNotEmptyArray = (arr: any) => Array.isArray(arr) && arr.length > 0;

export const changeNumberToArrayList = (number: any) => Array.from(Array(number).keys());

// /**
//  * Delete an array of keys from a given object
//  * @param {Object} targetObj Object to remove propeties from
//  * @param {Array} props Array of object properties to be deleted
//  * @returns {Object} A copy of the orginal object excluding the specified properties
//  */
export const omit = (targetObj: any, props: any): any => {
    // Clone the targetObj to avoid mutating the original data
    // eslint-disable-next-line prefer-object-spread
    const obj: any = Object.assign({}, targetObj);
    if (!Array.isArray(props)) {
        return;
    }

    props.forEach((prop) => {
        // eslint-disable-next-line no-prototype-builtins
        obj.hasOwnProperty(prop) && delete obj[prop];
    });

    // eslint-disable-next-line consistent-return
    return obj;
};


/**
 * Checks if an object has no set properties
 * @param {*} obj The object to test
 * @returns {*} boolean
 */
export const isObjectEmpty = (obj = {}) => !obj || Object.keys(obj).length === 0;

export const truncateMultilineText = (text: string, numChars: number) => {
    if (!text) return '';

    // Because '...' will be appended to long strings,
    // this ensures that the entire character count is as specified
    const maxStringLength = numChars - 3;

    return maxStringLength > text.length ? text : `${text.trim().substring(0, maxStringLength)}...`;
};



