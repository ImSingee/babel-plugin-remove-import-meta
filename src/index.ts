import { smart } from '@babel/template';
import type { PluginObj, NodePath } from '@babel/core';
import type { Statement, MemberExpression } from '@babel/types';

/**
 * Remove known `import.meta`[1] properties:
 *
 * - `url`[2]
 *
 * [1]: https://github.com/tc39/proposal-import-meta
 * [2]: https://html.spec.whatwg.org/#hostgetimportmetaproperties
 */
export default function (): PluginObj {
  return {
    name: 'remove-import-meta',

    visitor: {
      Program (path, state) {
        const metas: Array<NodePath<MemberExpression>> = [];
        const identifiers = new Set<string>();

        path.traverse({
          MemberExpression (memberExpPath) {
            const { node } = memberExpPath;

            if (
              node.object.type === 'MetaProperty' &&
              node.object.meta.name === 'import' &&
              node.object.property.name === 'meta' &&
              node.property.type === 'Identifier' &&
              node.property.name === 'url'
            ) {
              metas.push(memberExpPath);
              for (const name of Object.keys(memberExpPath.scope.getAllBindings())) {
                identifiers.add(name);
              }
            }
          }
        });

        if (metas.length === 0) {
          return;
        }

        const metaUrlReplacement = smart.ast`""` as Statement;

        for (const meta of metas) {
          meta.replaceWith(metaUrlReplacement);
        }
      }
    }
  };
}
