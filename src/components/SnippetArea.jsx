import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';

import { Card, CardText } from 'material-ui/Card';
import '../styles/codesplain.css'
import TextField from 'material-ui/TextField';
import ConfirmLockDialog from './ConfirmLockDialog.jsx'
import LockButton from './LockButton';
import { getIndexToRowColConverter } from '../util/util.js';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/go/go.js';
import 'codemirror/mode/python/python.js';


const snippetEditorModes = {
  go: 'go',
  python3: 'python',
};

const SnippetArea = ({ contents, isDialogOpen, onTitleChanged, onSnippetChanged, readOnly, switchReadOnlyMode, snippetLanguage, toggleConfirmLockDialogVisibility }) => {
  const codeMirrorOptions = {
    lineNumbers: true,
    theme: 'codesplain',
    mode: snippetEditorModes[snippetLanguage],
    readOnly,
  };
  let codeMirrorRef;
  return (
    <Card>
      <CardText>
      <TextField
        name="snippetName"
        hintText="Snippet Name"
        onChange={onTitleChanged}
      />
      <LockButton
        onClick={toggleConfirmLockDialogVisibility}
        readOnly={readOnly}
      />
      <ConfirmLockDialog
        isOpen={isDialogOpen}
        accept={switchReadOnlyMode}
        reject={toggleConfirmLockDialogVisibility}
      />
      <CodeMirror
        ref={cm => codeMirrorRef = cm}
        value={contents}
        options={codeMirrorOptions}
        onChange={ev => onSnippetChanged(ev, codeMirrorRef)}
      />
      </CardText>
    </Card>
  );
};

SnippetArea.propTypes = {
  contents: PropTypes.string.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  onTitleChanged: PropTypes.func.isRequired,
  onSnippetChanged: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  snippetLanguage: PropTypes.string.isRequired,
  switchReadOnlyMode: PropTypes.func.isRequired,
  toggleConfirmLockDialogVisibility: PropTypes.func.isRequired,
}

export default SnippetArea;

/*
Given a CodeMirror ref, styleRegion() will apply the specified css style to the
given region of code. The code is treated as a single string, and characters in 
that string must be identified by their index (as opposed to row/col). Both
start and end are inclusive.
*/
export function styleRegion(codeMirrorRef, start, end, css) {
  if (end < start) throw new Error('end must be greater than start');
  const cmElement = codeMirrorRef.getCodeMirror();
  const snippet = cmElement.getValue();
  const convert = getIndexToRowColConverter(snippet);
  cmElement.markText(convert(start), convert(end), {css: css});
}
