import React from 'react';

type PreRenderContentProps = {
  content: string;
};

const PreRenderContent: React.FC<PreRenderContentProps> = ({ content }) => {
  // Function to strip HTML tags and get plain text in a single line
  const extractText = (html: string) => {
    const p = document.createElement('p');
    p.innerHTML = html;
    return Array.from(p.childNodes)
      .map((node) => node.textContent)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  return (
    <p className="text-muted-foreground mb-4 truncate">
      {extractText(content)}
    </p>
  );
};

export default PreRenderContent;
