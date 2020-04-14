function findChildren(list, originalList) {
    list.map(item => {
        item.children = originalList.filter(sub => {
            if (!sub.parentID || !item.id) {
                return false
            }
            if (sub.parentID === item.id) {
                return true
            }
        });

        findChildren(item.children || [], originalList);

        return item;
    });
    return list;
}

const list = [{
    nickname: 'nickname',
    content: 'content'
}]

const formattedData = findChildren(list, list)

console.log(formattedData)