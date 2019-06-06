const childrenParser = require('../childrenParser');

const contentNodeParser = contentNode => {
    console.log('[childrenParser]', childrenParser)
    const children = contentNode["children"]
    return `<Content></Content>`

}

module.exports = contentNodeParser