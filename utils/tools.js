import dayjs from 'dayjs';
export function getTagList(articleList) {
  const result = articleList.reduce((res, {tag})=>{
    if(res[tag]) {
      res[tag] ++;
    } else {
      res[tag] = 1;
    }
    return res;
  }, Object.create(null));
  const tagList = Object.entries(result).map(([name, count])=>({name, count}));
  return tagList;
}

function getActicleItem(item) {
  return {
    createAt: dayjs(item.time).format('MM.DD'),
    theme: item.theme,
    url: item.url,
    title: item.title
  }
}

function getMonthItem(item) {
  const month = dayjs(item.time).month() + 1;
  return {
    [month] : [getActicleItem(item)]
  }
}

function mergeYearItem(yearItem, item) {
  const month = dayjs(item.time).month() + 1;
  const articleItem = getActicleItem(item);
  yearItem[month] = yearItem[month] ? yearItem[month].concat(articleItem) : [articleItem]
  return yearItem;
}


// {
//   "2017": {
//     "10": [
//       {
//         "createAt": "10.13",
//         "theme": "think",
//         "title": "码农的感悟123"
//       },
//       {
//         "createAt": "10.12",
//         "theme": "think",
//         "title": "码农的感悟123"
//       }
//     ]
//   },
//   "2018": {
//     "10": [
//       {
//         "createAt": "10.13",
//         "theme": "code",
//         "title": "码农的感悟"
//       }
//     ]
//   }
// }
// =============>
// [{
//   year: '',
//   monthList: [{
//     month: '',
//     articleList: [{
//       create_at：'',
//       theme: '',
//       url: '',
//       title: ''
//     }]
//   }]
// }]

function getMonthList(data) {
  return Object.entries(data).map(([month, articleList])=>{
    return {
      month,
      articleList
    }
  })
}


export function getYearList(articleList) {
  const tempData = articleList.reduce((res, curItem)=>{
    const year = dayjs(curItem.time).year();
    res[year] = res[year] ? mergeYearItem(res[year], curItem) : getMonthItem(curItem);
    return res;
  }, {});
  const resultList = Object.entries(tempData).map(([year, data])=>{
    return {
      year,
      monthList: getMonthList(data)
    }
  })
  return resultList;
}
