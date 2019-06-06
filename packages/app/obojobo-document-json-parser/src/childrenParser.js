const actions = require('./actions');
// console.log(actions)

const childrenParser = (children) => {
    let result = '';

    children.forEach(child => {
        const parser = actions[child.type];
        console.log('[actions]', actions)
        console.log('[type]', child.type)
        console.log('[parser]', parser)
        parser !== undefined
            ? result += parser(child)
            : ''
        
    })

    return result
}

module.exports = childrenParser