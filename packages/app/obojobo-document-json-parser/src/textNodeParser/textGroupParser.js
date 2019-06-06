const parseTextGroup = textGroup => {
    if(textGroup == null) return ''

    let result = ''
    textGroup.forEach(group => {
        result += `<p${parseData(group["data"])}>${parseText(group["text"])}</p>`
    })

    return result;
}

const parseData = attrs => {
    let result = '';
    for(const a in attrs){
        content[a] != null
        ? result += ' ' + [a] + ': "' + attrs[a] + '"'
        : ''
    }
    return result
}

const parseText = text => {
    return text["value"]
}

module.exports = textGroup => parseTextGroup(textGroup)