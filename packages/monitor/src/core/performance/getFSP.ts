import { Store } from '../../common';
import { isIncludeEle } from '../../utils';

interface NodeItem extends Node {
  tagName?: string;
}

let entries: {
  startTime: number;
  children: NodeItem[];
}[] = [];

export function getFSP(store: InstanceType<typeof Store>) {
  if (!MutationObserver) {
    throw new Error('浏览器不支持MutationObserver');
  }

  const next = window.requestAnimationFrame
    ? requestAnimationFrame
    : setTimeout;
  const ignoreDOMList = ['STYLE', 'SCRIPT', 'LINK', 'META'];
  const ob = new MutationObserver((mutationList) => {
    next(() => {
      entry.startTime = performance.now();
    });
    const entry = {
      startTime: 0,
      children: [],
    };
    for (const mutation of mutationList) {
      if (mutation.addedNodes.length) {
        let nodeLists: NodeItem[] = Array.from(mutation.addedNodes as NodeList);
        for (const node of nodeLists) {
          if (
            node.nodeType === 1 &&
            !ignoreDOMList.includes(node?.tagName) &&
            !isIncludeEle(node, entry.children)
          ) {
            entry.children.push(node);
          }
        }
      }
    }
    if (entry.children.length) {
      entries.push(entry);
    }
  });

  ob.observe(document, {
    childList: true,
    subtree: true,
  });
}
