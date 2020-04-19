const uuid = require('uuid');

const items = [
    {
        'description': 'Drake stuff',
        'image': 'https://bkstr.scene7.com/is/image/Bkstr/1623-TR400-1869-Liberty-Navy-Heather?$GMCategory_tablet$',
        'item_id': uuid.v4(),
        'name': 'Ball cap',
        'price': 19.99,
        'size': 'Large'
    }
];

const selectItems = () => ({
    rows: items
});

const selectItemByItemId = (itemId) =>
    items.find((item) => item['item_id'] === itemId);

const insertItem = (item) => items.push(item);

const updateItem = (updatedItem) => {
    const itemsThatDontMatch = items.filter((item) =>
        item['item_id'] !== updatedItem['item_id']
    );

    items = [
        ...itemsThatDontMatch,
        updatedItem
    ];
};

const deleteItemByItemId = (itemId) => {
    items = items.filter((item) =>
        item['item_id'] !== itemId
    );
};

module.exports = {
    deleteItemByItemId,
    insertItem,
    selectItemByItemId,
    selectItems,
    updateItem
};