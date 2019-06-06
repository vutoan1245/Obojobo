const childrenParser = require('../childrenParser');

const moduleNodeParser = moduleNode => {
    console.log('[childrenParser]', childrenParser)
    const content = moduleNode["content"]
    const children = moduleNode["children"]
    return `<Module ${moduleContentParser(content)}>${childrenParser(children)}</Module>`
}

const moduleContentParser = (moduleContent) => {
    let result = '';
    for(const c in moduleContent){
        result += (
            moduleContent[c] != null
                ? ` ${[c]}: "${moduleContent[c]}"`
                : ''
        )

    }
    return result
}

module.exports = moduleNodeParser