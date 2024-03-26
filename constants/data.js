import images from './images';

export const contacts = [
    {
        id: '1',
        userName: 'Trần Đình Khánh',
        userImg: images.user,
        isOnline: false,
        lastSeen: '3 Days ago',
        lastMessage: 'How is it going...',
        messageInQueue: 3,
        sentDate: '12/7',
    },
    {
        id: '2',
        userName: 'Đức Vĩ',
        userImg: images.user,
        isOnline: true,
        lastSeen: 'Online',
        lastMessage: 'How is it going...',
        messageInQueue: 3,
        sentDate: '12/7',
    },
];
