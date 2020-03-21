const uuid = require('uuid');

const items = [
    {
        'description': 'Drake stuff',
        'item_id': uuid.v4(),
        'name': 'Ball cap',
        'price': 19.99,
        'size': 'Large'
    }
];

const selectItems = () => ({
    driver: 'postgres',
    error: new Error(),
    rows: items
});

const selectItemByItemId = (itemId) =>
    items.find((item) => item['item_id'] === itemId);

module.exports = {
    selectItemByItemId,
    selectItems
};
