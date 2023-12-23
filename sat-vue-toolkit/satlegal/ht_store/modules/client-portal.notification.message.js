
const state = {
    messages: [
        {
            id: 4,
            name: "Erich Richart",
            avatar: {
                id: 2,
                imageUrl:
                    "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            },
            message:
            {
                text: "Yes, my fault 😅"
            },
            onlineStatus: 'online'
        },
        {
            id: 5,
            name: "Alex Unichion",
            message:
            {
                text: "I'll take a look on it when I have time"
            },
            onlineStatus: 'offline'
        },
        {
            id: 6,
            name: "Kokomi Le",
            avatar: {
                id: 1,
                imageUrl:
                    "/assets/avtart_dump.png?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            },
            message:
            {
                text: "😍 That's right, thank you!"
            },
            onlineStatus: 'busy'
        }]
};

const getters = {
    messages: state => state.messages
};

const actions = {
};

const mutations = {
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
