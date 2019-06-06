const childrenParser = require('./childrenParser');

const moduleNodeParser = moduleNode => {
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

const contentNodeParser = contentNode => {
    console.log('[contenetNodeParser]', childrenParser)
    contentNode !== null
        ? `<Content>${childrenParser(contentNode["children"])}</Content>`
        : ``
}

module.exports = {
    moduleNodeParser,
    contentNodeParser
}