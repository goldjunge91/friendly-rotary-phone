import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

// This object will be available in the global scope during visualization.
// It will collect the execution trace.
export const _viz = {
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

export function instrumentCode(code) {
    let instrumentedCode = code;
    // Parse with locations
    const ast = acorn.parse(code, { ecmaVersion: 2020, locations: true });
    const insertions = [];

    // Helper to instrument all statement nodes
    function instrumentStatements(body) {
        if (!Array.isArray(body)) return;
        for (const node of body) {
            // Only instrument actual statements
            if (node.type.endsWith('Statement')) {
                // Add line number to the node for trace
                const nodeWithLine = { ...node, line: node.loc?.start?.line };
                insertions.push({
                    pos: node.start,
                    text: `_viz.step(${JSON.stringify(nodeWithLine)});`
                });
            }
            // Recursively instrument blocks (e.g., inside if, loops)
            if (node.body) {
                if (Array.isArray(node.body)) {
                    instrumentStatements(node.body);
                } else if (node.body.body) {
                    instrumentStatements(node.body.body);
                }
            }
            // Instrument alternate blocks (else)
            if (node.alternate) {
                if (Array.isArray(node.alternate)) {
                    instrumentStatements(node.alternate);
                } else if (node.alternate.body) {
                    instrumentStatements(node.alternate.body);
                }
            }
        }
    }

    walk.simple(ast, {
        Program(node) {
            instrumentStatements(node.body);
        },
        FunctionDeclaration(node) {
            const nodeWithLine = { ...node, line: node.loc?.start?.line };
            insertions.push({
                pos: node.body.start + 1,
                text: `_viz.enterFunction(${JSON.stringify(nodeWithLine)});`
            });
            insertions.push({
                pos: node.body.end - 1,
                text: `_viz.leaveFunction(${JSON.stringify(nodeWithLine)});`
            });
            instrumentStatements(node.body.body);
        },
        FunctionExpression(node) {
            const nodeWithLine = { ...node, line: node.loc?.start?.line };
            insertions.push({
                pos: node.body.start + 1,
                text: `_viz.enterFunction(${JSON.stringify(nodeWithLine)});`
            });
            insertions.push({
                pos: node.body.end - 1,
                text: `_viz.leaveFunction(${JSON.stringify(nodeWithLine)});`
            });
            instrumentStatements(node.body.body);
        },
        ArrowFunctionExpression(node) {
            if (node.body && Array.isArray(node.body.body)) {
                instrumentStatements(node.body.body);
            }
        }
    });

    // Apply insertions from the end to the beginning to not mess up the indices.
    insertions.sort((a, b) => b.pos - a.pos).forEach(insertion => {
        instrumentedCode = instrumentedCode.slice(0, insertion.pos) + insertion.text + instrumentedCode.slice(insertion.pos);
    });

    return instrumentedCode;
}
