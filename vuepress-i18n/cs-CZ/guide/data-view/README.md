# Data view

TODO

## Příklad

TODO

```javascript
// create a DataSet
var data = new vis.DataSet();
data.add([
  {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
  {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
  {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
  {id: 4, text: 'item 4'}
]);

// create a DataView
// the view will only contain items having a property group with value 1,
// and will only output fields id, text, and date.
var view = new vis.DataView(data, {
  filter: function (item) {
    return (item.group == 1);
  },
  fields: ['id', 'text', 'date']
});

// subscribe to any change in the DataView
view.on('*', function (event, properties, senderId) {
  console.log('event', event, properties);
});

// update an item in the data set
data.update({id: 2, group: 1});

// get all ids in the view
var ids = view.getIds();
console.log('ids', ids); // will output [1, 2]

// get all items in the view
var items = view.get();
</pre>
```

## Tvorba instancí

TODO

```javascript
var data = new vis.DataView(dataset, options);
```

TODO
