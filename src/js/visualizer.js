const acorn = require('acorn');
const walk = require('acorn-walk');

// This object will be available in the global scope during visualization.
// It will collect the execution trace.
const _viz = {
    trace: [],
    step: function(node) {
        this.trace.push({
            type: 'step',
            node: {
                type: node.type,
                start: node.start,
                end: node.end
            }
        });
    },
    enterFunction: function(node) {
        this.trace.push({
            type: 'enterFunction',
            node: {
                type: node.type,
                start: node.start,
                end: node.end
            }
        });
    },
    leaveFunction: function(node) {
        this.trace.push({
            type: 'leaveFunction',
            node: {
                type: node.type,
                start: node.start,
                end: node.end
            }
        });
    }
};

// Make _viz globally accessible for the instrumented code.
window._viz = _viz;

function instrumentCode(code) {
    let instrumentedCode = code;
    const ast = acorn.parse(code, { ecmaVersion: 2020 });

    const insertions = [];

    walk.simple(ast, {
        ExpressionStatement(node) {
            insertions.push({
                pos: node.start,
                text: `_viz.step(${JSON.stringify(node)});`
            });
        },
        FunctionDeclaration(node) {
            insertions.push({
                pos: node.body.start + 1,
                text: `_viz.enterFunction(${JSON.stringify(node)});`
            });
            insertions.push({
                pos: node.body.end -1,
                text: `_viz.leaveFunction(${JSON.stringify(node)});`
            });
        }
    });

    // Apply insertions from the end to the beginning to not mess up the indices.
    insertions.sort((a, b) => b.pos - a.pos).forEach(insertion => {
        instrumentedCode = instrumentedCode.slice(0, insertion.pos) + insertion.text + instrumentedCode.slice(insertion.pos);
    });

    return instrumentedCode;
}

module.exports = {
    instrumentCode,
    _viz
};
