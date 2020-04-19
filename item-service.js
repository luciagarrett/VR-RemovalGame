const {
    selectItems,
    selectItemByItemId
} = require('../repositories/item-repository');

const mapToModel = (item) => ({
    description: item['description'],
    image: item['image'],
    itemId: item['item_id'],
    name: item['name'],
    price: item['price'],
    size: item['size']
});

const mapToDTO = (item) => ({
    'description': item.description,
    'image': item.image,
    'item_id': item.itemId,
    'name': item.name,
    'price': item.price,
    size: item.size
});

const getAllItems = () => {
    const {rows} = selectItems();

    return rows.map(mapToModel);
};

const getItemByItemId = (itemId) => {
    const item = selectItemByItemId(itemId);

    if (!item) {
        return null;
    }

    return mapToModel(item);
};

const addItem = (item) => insertItem(mapToDTO(item));
const modifyItem = (item) => updateItem(mapToDTO(item));
const removeItemByItemId = (itemId) => deleteItemByItemId(itemId);

module.exports = {
    addItem,
    getAllItems,
    getItemByItemId,
    modifyItem,
    removeItemByItemId
};
