import React, { PropTypes } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import RaisedButton from 'material-ui/RaisedButton';

import LineSnippet from './LineSnippet';

const AnnotationDisplay = ({ closeAnnotation, lineNumber, lineText, snippetLanugage, text }) => {
  return (
    <div>
      <LineSnippet
        lineNumber={lineNumber + 1}
        value={lineText}
      />
      <MarkdownRenderer
        markdown={text}
      />
      <RaisedButton
        label="Close"
        secondary
        onTouchTap={closeAnnotation}
      />
    </div>
  );
};

AnnotationDisplay.propTypes = {
  closeAnnotation: PropTypes.func.isRequired,
  lineNumber: PropTypes.number.isRequired,
  lineText: PropTypes.string.isRequired,
  snippetLanguage: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default AnnotationDisplay;
