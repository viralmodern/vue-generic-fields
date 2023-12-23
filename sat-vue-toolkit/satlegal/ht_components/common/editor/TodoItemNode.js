import { TodoItem as TipTapItemNode } from 'tiptap-extensions'

export default class TodoItemNode extends TipTapItemNode {
  get view () {
    return {
      props: ['node', 'updateAttrs', 'editable'],
      methods: {
        onChange () {
          this.updateAttrs({
            done: !this.node.attrs.done,
          })
        },
      },
      render (h) {
        return h(
          'li',
          {
            attrs: {
              'data-type': 'todo_item',
              'data-done': this.node.attrs.done.toString(),
            },
          },
          [
            h('span', {
              staticClass: 'todo-checkbox',
              attrs: {
                contenteditable: 'false',
              },
              on: {
                click: this.onChange,
              },
            }),
            h('div', {
              ref: 'content',
              staticClass: 'todo-content',
              attrs: {
                contenteditable: this.editable.toString(),
              },
            }),
          ],
        )
      },
    }
  }
}