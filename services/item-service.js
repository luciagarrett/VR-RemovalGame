const {
    selectItems,
    selectItemByItemId
} = require('../repositories/item-repository');

const mapToModel = (cart) => ({
    itemId: item['item_id'],
    name: item['name'],
    description: item['description'],
    price: item['price'],
    size: item['size']
});

const getAllItems = () => {
    const {rows} = selectItems();

    return rows.map(mapToModel);
};

const getItemByItemId = (cartId) => {
    const cart = selectItemByItemId(itemId);

    return mapToModel(item);
};

module.exports = {
    getAllItems,
    getItemByItemId
};