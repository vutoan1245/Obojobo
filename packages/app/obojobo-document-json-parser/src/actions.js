const contentNodeParser = require('./contentNodeParser/contentNodeParser');
const moduleNodeParse = require('./moduleNodeParser/moduleNodeParser');
const pageNodeParser = require('./pageNodeParser/pageNodeParser');
const textNodeParser = require('./textNodeParser/textNodeParser');

const actions = {
    "ObojoboDraft.Modules.Module": (node) => moduleNodeParse(node),
    "ObojoboDraft.Sections.Content": (node) => contentNodeParser(node),
    // "ObojoboDraft.Pages.Page": pageNodeParser,
    // "ObojoboDraft.Chunks.Heading": "Heading",
    // "ObojoboDraft.Chunks.Text": textNodeParser,
}

module.exports = actions