import data from './data.mjs'

export const escapeString = (string) => {
    const symbols = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
    }

    return string.replace(/[<>&]/g, (tag) => {
        return symbols[tag] || tag;
    })
}

export const getDataByID = (id, array) => {
    return array.find(item => item.id === id);
};

export const dateFormat = (date) => {
    return new Date(date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'})
}

export const getValidData = (data, fallback) => {
    return data ? data : fallback;
}
