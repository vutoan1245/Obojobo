const parser = require('./src/moduleNodeParser/moduleNodeParser');
const parser2 = require('./src/contentNodeParser/contentNodeParser');

const jsonExample = require('./jsonExample.json')

const jsonToXmlParser = (node) => {
    return parser(node)
}

console.log(jsonToXmlParser(jsonExample))
// console.log(parseContent(jsonExample["content"]));
