import React from 'react';
import type { Props } from '@theme/TOC';

function OnThisPage({ toc, ...props }: Props): JSX.Element | null {
  if (!toc.length) {
    return null;
  }
  return (
    <div className="toc-wrapper">
      <strong className="toc-title">What's on this page</strong>
      <ul className="toc-list">
        {toc.map((item) => (
          <li key={item.id} className="toc-list-item">
            <a href={`#${item.id}`}>{item.value}</a>
            {item.children.length > 0 && (
              <ul className="toc-list-item-children">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <a href={`#${child.id}`}>{child.value}</a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OnThisPage;
