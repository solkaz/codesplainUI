import { styleRegion } from '../components/SnippetArea';

const ignoredTokens = [
  'suite',
  'file_input',
  'simple_stmt',
  'trailed_atom',
  'trailer',
  'comparison', //Dont ignore after boxes are added
  'testlist_comp',
]

const tokenColors = {
  'for_stmt' :    '#F7ABAB',
  'if_stmt':      '#FFFF00',
  'number':       'DEA5A4',
  'exptr_stmt':   '#F7ABD4',
  'expr':         '#F0ABF7',
  'str':          '#CAABF7',
  'atom':         '#ABDBF7',
  'expr_stmt':    '#BEDA0B',
  'arglist':      '#F7CDAB',
  'argument':     '#EAF7AB',
  'integer':      '#ABF7C6',
  'funcdef':      '#AEC6CF',
  'parameters':   '#FFB347',
  'classdef':     '#03C03C',
  'try_stmt':     '#966FD6',
  'pass_stmt':    '#FDFD96',
  'except_clause':'#779ECB',
  'while_stmt':   '#F0E68C',
  'and_expr':     '#F0E68C',
  'arith_expr':   '#FFA500',
  'comp_op':      '#DAA520',
  'dictorsetmaker':'#00FF7F',
}

function getColor(type) {
  return tokenColors[type];
}

export function highlight(snippet, node, codeMirrorRef, filters, parentColor) {
  let color = parentColor;
  if (parentColor === undefined) color = 'transparent';

  // If we aren't ignoring this token...
  if (ignoredTokens.indexOf(node.type) === -1) {
    color = getColor(node.type); // Get the color for this token's type

    // If this token has no color 
    if (!color) {
      color = 'inherit';
      console.warn(`token "${node.type}" has no color specified!`);
    }

    // If this token's filter is not selected
    if (!filters[node.type] || !filters[node.type].selected) {
      color = parentColor;
    }

    // Apply the background color CSS to this token
    styleRegion(
      codeMirrorRef,
      node.begin,
      node.end,
      `background-color: ${color};`
    );
  }

  // Highlight all children of this token
  node.children.forEach(child => {
    if (child === Object(child)) 
      highlight(snippet, child, codeMirrorRef, filters, color);
  });
}
