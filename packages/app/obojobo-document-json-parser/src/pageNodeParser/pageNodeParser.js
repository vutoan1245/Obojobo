const { childrenParser } = '../actions';

const pageNodeParser = pageNode => {
    pageNode !== null
    ? `<Content>${childrenParser(pageNode["children"])}</Content>`
    : ``
}

module.exports = pageNodeParser