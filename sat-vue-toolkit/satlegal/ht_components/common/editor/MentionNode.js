import { Mention } from 'tiptap-extensions'
import { replaceText } from 'tiptap-commands'
import SuggestionsPlugin from './SuggestionsPlugin'

export default class MentionNode extends Mention {
    commands({ schema }) {
        return attrs => replaceText(null, schema.nodes[this.name], attrs)
    }

    get plugins() {
        let SuggestionsObject = SuggestionsPlugin({
            command: ({ range, attrs, schema }) => replaceText(range, schema.nodes[this.name], attrs),
            appendText: ' ',
            matcher: this.options.matcher,
            users: this.options.items,
            onEnter: this.options.onEnter,
            onChange: this.options.onChange,
            onExit: this.options.onExit,
            onKeyDown: this.options.onKeyDown,
            onFilter: this.options.onFilter,
            suggestionClass: this.options.suggestionClass,
        })
        return [
            { ...SuggestionsObject.Suggestions, setItems: SuggestionsObject.setItems }
        ]
    }

}