import { Store } from '../../common';
import { isIncludeEle } from '../../utils';

type NodeItem = {
  tagName: string;
} & Node;

export function getFSP(store: InstanceType<typeof Store>) {
  if (!MutationObserver) {
    throw new Error('浏览器不支持MutationObserver');
    return;
  }

  const next = window.requestAnimationFrame
    ? requestAnimationFrame
    : setTimeout;
  const ignoreDOMList = ['STYLE', 'SCRIPT', 'LINK', 'META'];
  const ob = new MutationObserver((mutationList) => {
    for (const mutation of mutationList) {
      debugger;
      if (mutation.addedNodes.length) {
        let nodeLists: NodeItem[] = Array.from(mutation.addedNodes as NodeList);
        for (const node of nodeLists) {
          if (
            node.nodeType === 1 &&
            !ignoreDOMList.includes(node.tagName) &&
            !isIncludeEle(node, entry.children)
          ) {
            // entry.children.push(node);
          }
        }
      }
    }
    debugger;
  });

  ob.observe(document, {
    childList: true,
    subtree: true,
  });
}
