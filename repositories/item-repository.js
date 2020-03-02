const uuid = require('uuid');

let items = [
    {
        'item_id': uuid.v4(),
        'name': 'Ball cap',
        'description': 'Drake stuff',
        'price': 19.99,
        'size': 'Large'
    }
];

const selectItems = () => ({
    rows: items,
    error: new Error(),
    driver: 'postgres'
});

const selectItemByItemId = (itemId) =>
    items.find((item) => item['item_id'] === itemId);

module.exports = {
    selectItems,
    selectItemByItemId
};