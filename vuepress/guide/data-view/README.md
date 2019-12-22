# Data View

A DataView offers a filtered and/or formatted view on a
[Data Set](../data-set/). One can subscribe to changes in a DataView, and easily
get filtered or formatted data without having to specify filters and field types
all the time.

## Example

The following example shows how to use a DataView.

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

## Construction

A DataView can be constructed as:

```javascript
var data = new vis.DataView(dataset, options);
```

where:

- `dataset` is a DataSet or DataView.
- `options` is an object which can contain the following properties. Note that
  these properties are exactly the same as the properties available in methods
  `DataSet.get` and `DataView.get`.

  - `convert`: `Record<string, string>` = `undefined` An object containing field
    names as key, and data types as value. By default, the type of the
    properties of an item are left unchanged. When a field type is specified,
    this field in the items will be converted to the specified type. This can be
    used for example to convert ISO strings containing a date to a JavaScript
    Date object, or convert strings to numbers or vice versa. The available data
    types are listed in section Data Types.

  - `fields`: `string[] | Record<string, string>` = `udefined` An array with
    field names, or an object with current field name and new field name that
    the field is returned as. By default, all properties of the items are
    emitted. When `fields` is defined, only the properties whose name is
    specified in `fields` will be included in the returned items.

  - `filter`: `(item: Item) => boolean` = `undefined` Items can be filtered on
    specific properties by providing a filter function. A filter function is
    executed for each of the items in the DataSet, and is called with the item
    as parameter. The function must return a boolean. All items for which the
    filter function returns true will be emitted. See also section Data
    Filtering.
