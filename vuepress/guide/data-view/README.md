# Data View

A DataView offers a filtered and/or formatted view on a [Data Set](../data-set).
One can subscribe to changes in a DataView, and easily get filtered or formatted
data without having to specify filters and field types all the time.

## Example

The following example shows how to use a DataView.

:::: tabs

::: tab TypeScript

```typescript
import { DataSet, DataView } from "vis-data";

interface Item {
  id: number;
  text: string;
  date: string | Date;
  group: number;
  first?: boolean;
}

// create a DataSet
const data = new DataSet<Item, "id">();
data.add([
  { id: 1, text: "item 1", date: new Date(2013, 6, 20), group: 1, first: true },
  { id: 2, text: "item 2", date: "2013-06-23", group: 2 },
  { id: 3, text: "item 3", date: "2013-06-25", group: 2 },
  { id: 4, text: "item 4" }
]);

// create a DataView
// the view will only contain items having a property group with value 1,
// and will only output fields id, text, and date.
const view = new DataView<Item, "id">(data, {
  filter: function(item): boolean {
    return item.group == 1;
  },
  fields: ["id", "text", "date"]
});

// subscribe to any change in the DataView
view.on("*", function(event, payload, senderId): void {
  console.log("event", event, payload);
});

// update an item in the data set
data.update({ id: 2, group: 1 });

// get all ids in the view
const ids = view.getIds();
console.log("ids", ids); // will output [1, 2]

// get all items in the view
const items = view.get();
```

:::

::: tab JavaScript

```javascript
// create a DataSet
const data = new vis.DataSet();
data.add([
  { id: 1, text: "item 1", date: new Date(2013, 6, 20), group: 1, first: true },
  { id: 2, text: "item 2", date: "2013-06-23", group: 2 },
  { id: 3, text: "item 3", date: "2013-06-25", group: 2 },
  { id: 4, text: "item 4" }
]);

// create a DataView
// the view will only contain items having a property group with value 1,
// and will only output fields id, text, and date.
const view = new vis.DataView(data, {
  filter: function(item) {
    return item.group == 1;
  },
  fields: ["id", "text", "date"]
});

// subscribe to any change in the DataView
view.on("*", function(event, payload, senderId) {
  console.log("event", event, payload);
});

// update an item in the data set
data.update({ id: 2, group: 1 });

// get all ids in the view
const ids = view.getIds();
console.log("ids", ids); // will output [1, 2]

// get all items in the view
const items = view.get();
```

:::

::::

## Construction

A DataView can be constructed as:

:::: tabs

::: tab TypeScript

```typescript
import { DataView } from "vis-data";

interface Item {
  id: number | string;
  // zero or more arbitrary properties
}

const data = new DataView<Item, "id">(dataset, options);
```

:::

::: tab JavaScript

```javascript
const data = new vis.DataView(dataset, options);
```

:::

::::

where:

- `dataset`: `DataSet` = `new DataSet()`

  A [Data Set](../data-set) or [Data View](../data-view) which will be the
  source for this [Data View](../data-view).

- `options`: `undefined | Object` = `{}`

  An optional configuration object which can contain the following properties.
  Note that these properties are exactly the same as the properties available in
  methods `DataSet.get` and `DataView.get`.

  - `convert`: `Record<string, string>` = `undefined`

    An object containing field names as key, and data types as value. By
    default, the type of the properties of an item are left unchanged. When a
    field type is specified, this field in the items will be converted to the
    specified type. This can be used for example to convert ISO strings
    containing a date to a JavaScript Date object, or convert strings to numbers
    or vice versa. The available data types are listed in section
    <a href="dataset.html#Data_Types">Data Types</a>.

  - `fields`: `string[] | Record<string, string>` = `udefined`

    An array with field names, or an object with current field name and new
    field name that the field is returned as. By default, all properties of the
    items are emitted. When `fields` is defined, only the properties whose name
    is specified in `fields` will be included in the returned items.

  - `filter`: `(item: Item) => boolean` = `undefined`

    Items can be filtered on specific properties by providing a filter function.
    A filter function is executed for each of the items in the DataSet, and is
    called with the item as parameter. The function must return a boolean. All
    items for which the filter function returns true will be emitted. See also
    section <a href="dataset.html#Data_Filtering">Data Filtering</a>.

## Methods

DataView contains the following methods:

### get

```typescript
interface DataView {
  get(options?: Options): Record<Id, Item> | Item[];
  get(id: Id, options?: Options): Item | Record<Id, Item>;
  get(ids: Id[], options?: Options): Record<Id, Item> | Item[];
}
```

Get a single item, multiple items, or all items from the DataView. Usage
examples can be found in section [Getting Data](#Getting_Data), and the
available `options` are described in section [Data Selection](#Data_Selection).
When no item is found, `null` is returned when a single item was requested, and
and empty Array is returned in case of multiple id's.

### getDataSet

```typescript
interface DataView {
  getDataSet(): DataSet;
}
```

Get the DataSet the [Data View](../data-view) is connected to. If there are
multiple chained [Data Views](../data-view) the chain is traversed until a
[Data Set](../data-set) is found and returned.

### getIds

```typescript
interface DataView {
  getIds([options]): number[];
}
```

Get ids of all items or of a filtered set of items. Available `options` are
described in section [data selection](../data-set#data-selection), except that
options `fields` and `type` are not applicable in case of `getIds`.

### off

```typescript
interface DataView {
  off(event: "add" | "update" | "remove" | "*", callback: Function): void;
}
```

Unsubscribe from an event, remove an event listener. See section
[subscriptions](#subscriptions).

### on

```typescript
interface DataView {
  on(event: "add" | "update" | "remove" | "*", callback: Function): void;
}
```

Subscribe to an event, add an event listener. See section
[subscriptions](#subscriptions).

### refresh

```typescript
interface DataView {
  refresh(): void;
}
```

Refresh the filter results of a DataView. Useful when the filter function
contains dynamic properties, like:

:::: tabs

::: tab TypeScript

```typescript
import { DataSet, DataView } from "vis-data";

interface Item {
  id: number | string;
  value: number;
}

const data = new DataSet<Item, "id">();
const view = new DataView<Item, "id">(data, {
  filter: function(item) {
    return item.value > threshold;
  }
});
```

:::

::: tab JavaScript

```javascript
const data = new vis.DataSet();
const view = new vis.DataView(data, {
  filter: function(item) {
    return item.value > threshold;
  }
});
```

:::

::::

In this example, `threshold` is an external parameter. When the value of
`threshold` changes, the DataView must be notified that the filter results may
have changed by calling `DataView.refresh()`.

### setData

```typescript
interface DataView {
  setData(data): void;
}
```

Replace the DataSet of the DataView. Parameter `data` can be a DataSet or a
DataView.

## Properties

[Data View](../data-view) contains the following properties.

### length

```typescript
interface DataView {
  length: number;
}
```

The number of items in the [Data View](../data-view).

## Getting Data

Data of the [Data View](../data-view) can be retrieved using the method `get`.

```javascript
const items = view.get();
```

Data of a DataView can be filtered and formatted again, in exactly the same way
as in a DataSet. See sections
[Data Manipulation](../data-set/#data-manipulation) and
[Data Selection](../data-set/#data-selection) for more information.

:::: tabs

::: tab TypeScript

```typescript
const items = dataView.get({
  fields: ["id", "score"],
  filter: (item): boolean => {
    return item.score > 50;
  }
});
```

:::

::: tab JavaScript

```javascript
const items = dataView.get({
  fields: ["id", "score"],
  filter: item => {
    return item.score > 50;
  }
});
```

:::

::::

## Subscriptions

One can subscribe on changes in the DataView. Subscription works exactly the
same as for [Data Set](../data-set). See
[subscriptions](../data-set/#subscriptions) for more information.

### Example

:::: tabs

::: tab TypeScript

```typescript
import { DataSet, DataView } from "vis-data";

interface Item {
  id: number;
  group: number;
  data: unknown;
}

// Create a DataSet and a view on the data set.
const data = new DataSet<Item, "id">();
const view = new DataView<Item, "id">({
  filter: function(item): boolean {
    return item.group == 2;
  }
});

// Subscribe to any change in the DataView.
view.on("*", function(event, payload, senderId): void {
  console.log("event:", event, "payload:", payload, "senderId:", senderId);
});

// Add, update, and remove data in the DataSet...
```

:::

::: tab JavaScript

```javascript
// Create a DataSet and a view on the data set.
const data = new vis.DataSet();
const view = new vis.DataView({
  filter: function(item) {
    return item.group == 2;
  }
});

// Subscribe to any change in the DataView.
view.on("*", function(event, payload, senderId) {
  console.log("event:", event, "payload:", payload, "senderId:", senderId);
});

// Add, update, and remove data in the DataSet...
```

:::

::::
