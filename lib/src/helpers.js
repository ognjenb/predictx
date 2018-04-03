var assignWith = require('lodash.assignwith');

function getNewStruct(index) {
    return {
        numberOfChars: 0,
        origins: [index]
    }
}

function isAllowedChar(str) {
    return (/[a-z]/.test(str));
}

function buildDictionary(charCollection, index) {
    return charCollection
        .split('')
        .reduce((dict, character) => {
            if (!dict[character]) {
                dict[character] = getNewStruct(index);
            }

            ++dict[character].numberOfChars;

            return dict;
        }, {});
}

function mergerFunc(objV, sourceV) {
    if (!objV) {
        return sourceV;
    }

    if (objV.numberOfChars > sourceV.numberOfChars) {
        return objV;
    } else if (objV.numberOfChars === sourceV.numberOfChars) {
        objV.origins = objV.origins.concat(sourceV.origins);
        return objV;
    } else {
        return sourceV;
    }
}

function getOriginString(element) {
    return element.origins.length > 1 ? '=' : element.origins[0] + 1;
}

function formatString(result) {
    return result
        .sort((a, b) => {
            let diff = b.numberOfChars - a.numberOfChars;

            if (diff === 0) {
                return a.key < b.key ? -1 : 1;
            }
            return diff;
        })
        .map(element => `${getOriginString(element)}:${element['key'].repeat(element.numberOfChars)}`)
        .join('/');
}

function getResponse(list) {
    let dicts = list.map(buildDictionary);

    let reduced = dicts.reduce((dict, curr) => assignWith(dict, curr, mergerFunc))

    return Object
        .keys(reduced)
        .map(key => ({ key: key, origins: reduced[key].origins, numberOfChars: reduced[key].numberOfChars}))
        .filter(obj => obj.numberOfChars > 1 && isAllowedChar(obj.key));
}

function mix(list) {
    return formatString(getResponse(list));
}

module.exports = {
    mix, getResponse, formatString, buildDictionary
}