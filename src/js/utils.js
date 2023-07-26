/**
 * Replaces invalid characters with valid mnemonics and returns a string
 * @param string
 * @returns {string}
 */
export const escapeString = (string) => {
    const symbols = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
    }

    return string.replace(/[<>&]/g, (tag) => {
        return symbols[tag] || tag
    })
}

/**
 * Searches an array and returns an object with the specified ID property value
 * @param id {int}
 * @param array {Object[]}
 * @returns {Object}
 */
export const getDataByID = (id, array) => {
    return array.find(item => item.id === id)
}

/**
 * Convert date string to format: March 11.
 * @param date {string}
 * @param locale {string} desired language locale
 * @returns {string}
 */
export const formatDate = (date, locale = 'ru-RU') => {
    return new Date(date).toLocaleDateString(locale, {day: 'numeric', month: 'long'})
}

/**
 * Validates input and returns "data" if it's correct, or "fallback" if it's invalid.
 * @param data
 * @param fallback
 * @returns {*}
 */
export const getValidData = (data, fallback) => {
    return data ? data : fallback
}
