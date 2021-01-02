import React from 'react';
export function wrapWithDocument(element: JSX.Element): JSX.Element {
  return (
    <html>
      <head></head>
      <body>
        <div id="__next">{element}</div>
      </body>
    </html>
  );
}