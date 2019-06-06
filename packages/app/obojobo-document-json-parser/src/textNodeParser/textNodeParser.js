const parseTextGroup = '../parseTextGroup';

const parseTextNode = textNode => {
    const content = textNode["content"]
    return (
        content != null
        ? ''
        : parseTextGroup(content["textGroup"])
    )
}

module.exports = textNode => parseTextNode(textNode)