import MarkdownIt from 'markdown-it'
import taskLists from 'markdown-it-task-lists'
import hljs from 'highlight.js'
// import Tribute from 'tributejs'
import 'tributejs/tribute.css'

const getName = (person) => {
    let name;
    try {
      let pk = person.pk;
      name = `${person.first_name}${person.last_name}`
      pk = pk.toString()
      name = name.length ? `${person.first_name} ${person.last_name}` : pk
    }catch (e) {
      name = person.name
    }
    return person.name
}
const getAvatar = (item) => {
    let avatar = item.avatar,
        pk = item.pk,
        name = `${item.first_name}${item.last_name}`;
    pk = pk.toString()
    name = name.length ? name : pk
    return avatar ? avatar : name
}
export default {
    props: {
        users: {
            type: Array,
            default: () => [
                {
                    key: 'Jordan Humphreys',
                    pk: 123,
                    email: 'jordan@zurb.com'
                },
                {
                    key: 'Sir Walter Riley',
                    pk: 530,
                    email: 'jordan+riley@zurb.com'
                }
            ]
        },
        pathUser: {
            type: String,
            default: () => 'https://satchaos.demo.satproj.io/mb'
        },
        pathTag: {
            type: String,
            default: () => 'https://satchaos.demo.satproj.io/#'
        },

        tags: {
            type: Array,
            default: () => [
                {
                    name: 'Bug fix taskboard',
                    email: 'bobbill@example.com',
                    pk: 1234
                },
                {
                    name: 'Generic fields slickgrid',
                    email: 'steve@example.com',
                    pk: 8765
                }
            ]
        }
    },
    data() {
        return {
            md: null,
            Tribute: null,
            tribute: null,
            modePreview: false,
            uiShowCustom: false,
        }
    },
    mounted() {
    },
    created() {
    },
    destroyed() {
        this.md = null;
        this.Tribute = null;
        this.tribute = null;
        this.modePreview = false;
    },
    methods: {
        $$onKeyup(ev) {
            // eslint-disable-line
        },
        $$initialize(data) {
            const vm = this
            vm.md = MarkdownIt({
                html: false,
                breaks: true,
                linkify: true,
                table: true,
                highlight: function (str, lang) {
                    // If lang is specified
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return hljs.highlight(lang, str).value
                        } catch (__) {
                        } // eslint-disable-line
                    } else {
                        // try to guess the lang
                        // try {
                        //   return hljs.highlightAuto(str).value
                        // } catch (__) {}
                    }
                    // Plain text
                    return vm.md.utils.escapeHtml(str)
                }
            })
            vm.md.use(taskLists, {enabled: true})
            vm.Tribute = require('tributejs')
            vm.tribute = new vm.Tribute({
                collection: [
                    {
                        // The function that gets call on select that retuns the content to insert
                        selectTemplate: function (item) {
                            console.log('MBS',item)
                            if (this.range.isContentEditable(this.current.element)) {
                                return (
                                    '<a href="http://zurb.com" title="' +
                                    item.original.pk +
                                    '">@' +
                                    item.original.pk +
                                    '</a>'
                                )
                            }
                            return `[@${getName(item.original)}](${vm.pathUser}/${item.original.pk})`
                            // return "@" + item.original.pk;
                        },
                        // template for displaying item in menu
                        menuItemTemplate: function (item) {
                            // `'XXX' ${item.string}`
                            return item.string

                        },
                        values: vm.users,

                        lookup: function (person, mentionText) {
                            return getName(person)
                        },

                        // fillAttr: 'pk'
                        fillAttr: 'name',
                        // the array of objects
                        // values: vm.users
                    },
                    {
                        // The symbol that starts the lookup
                        trigger: '#',

                        // The function that gets call on select that retuns the content to insert
                        selectTemplate: function (item) {
                            if (this.range.isContentEditable(this.current.element)) {
                                return (
                                    '<a href="mailto:' +
                                    item.original.email +
                                    '">#==xx' +
                                    item.original.name.replace() +
                                    '</a>'
                                )
                            }
                            return `[#${item.original.name}](${vm.pathTag}/${item.original.pk})`
                            // return "#" + item.original.pk;
                            // return "#" + item.original.name;
                        },
                        requireLeadingSpace: false,
                        // function retrieving an array of objects
                        values: vm.tags,

                        lookup: 'name',

                        fillAttr: 'name'
                    }
                ]
            })
            try {
                vm.tribute.attach(data.el)
            } catch (e) {
            }
        },
        $$changeMode(mode) {
            this.modePreview = !!mode
        }
    }
}
