# Data Set

## Overview

Vis.js comes with a flexible [Data Set](../data-set), which can be used to hold
and manipulate unstructured data and listen for changes in the data. The
[Data Set](../data-set) is key/value based (refered to as id/item in the code).
Data items can be added, updated and removed from the [Data Set](../data-set),
and one can subscribe to changes in the [Data Set](../data-set). The data in the
[Data Set](../data-set) can be filtered and ordered.

## Usage Example

The following example shows how to use a [Data Set](../data-set):

:::: tabs

::: tab TypeScript

```typescript
import { DataSet } from "vis-data";

interface Item {
  id: number;
  date: string | Date;
  group: number;
  first?: boolean;
}

// create a DataSet
const options = {};
const data = new DataSet<Item, "id">(options);

// add items
// note that the data items can contain different properties and data formats
data.add([
  { id: 1, text: "item 1", date: new Date(2013, 6, 20), group: 1, first: true },
  { id: 2, text: "item 2", date: "2013-06-23", group: 2 },
  { id: 3, text: "item 3", date: "2013-06-25", group: 2 },
  { id: 4, text: "item 4" }
]);

// subscribe to any change in the DataSet
data.on("*", (event, properties, senderId) :void=>{
  console.log("event", event, properties);
});

// update an existing item
data.update({ id: 2, group: 1 });

// remove an item
data.remove(4);

// get all ids
const ids = data.getIds();
console.log("ids", ids);

// get a specific item
const specificItem = data.get(1);
console.log("specific item", specificItem);

// get multiple specific items
const specificItems = data.get([1, 3]);
console.log("specific items", specificItems);

// retrieve a filtered subset of the data
const filteredItems = data.get({
  filter: (item):boolean {
    return item.group == 1;
  }
});
console.log("filtered items", filteredItems);
```

:::

::: tab JavaScript

```typescript
// create a DataSet
const options = {};
const data = new vis.DataSet(options);

// add items
// note that the data items can contain different properties and data formats
data.add([
  { id: 1, text: "item 1", date: new Date(2013, 6, 20), group: 1, first: true },
  { id: 2, text: "item 2", date: "2013-06-23", group: 2 },
  { id: 3, text: "item 3", date: "2013-06-25", group: 2 },
  { id: 4, text: "item 4" }
]);

// subscribe to any change in the DataSet
data.on("*", (event, properties, senderId) => {
  console.log("event", event, properties);
});

// update an existing item
data.update({ id: 2, group: 1 });

// remove an item
data.remove(4);

// get all ids
const ids = data.getIds();
console.log("ids", ids);

// get a specific item
const specificItem = data.get(1);
console.log("specific item", specificItem);

// get multiple specific items
const specificItems = data.get([1, 3]);
console.log("specific items", specificItems);

// retrieve a filtered subset of the data
const filteredItems = data.get({
  filter: item => {
    return item.group == 1;
  }
});
console.log("filtered items", filteredItems);
```

:::

::::

## Construction

A [Data Set](../data-set) can be constructed as:

:::: tabs

::: tab TypeScript

```typescript
import { DataSet } from "vis-data";

interface Item {
  id: number | string;
  // zero or more custom properties
}

const data: undefined | Item[] = [];
const options:
  | undefined
  | {
      fieldId?: string;
      queue?:
        | boolean
        | {
            delay: number;
            max: number;
          };
    } = {
  fieldId: "id",
  queue: false
};

const data = new DataSet<Item, "id">(data, options);
```

:::

::: tab JavaScript

```javascript
const data = [
  /* zero or more items */
];
const options = {
  fieldId: "id",
  queue: false
};

const data = new vis.DataSet(data, options);
```

:::

::::

where:

- `data`: `Item[]` = `undefined`

  Optional and omittable array of items.

- `options`: `Object` = `undefined`

  Optional and omittable object with following properties that are all also
  optional:

  - `fieldId`: `undefined | string` = `"id"`

    The name of the field containing the id of the items.

    When data is fetched from a server which uses some specific field to
    identify items, this field name can be specified in the DataSet using the
    option `fieldId`. For example [CouchDB](http://couchdb.apache.org/) uses the
    property `_id` to identify documents.

  - `queue`: `undefined | boolean | Object` = `false`

    Queue data changes (`"add"`, `"update"`, `"remove"`) and flush them at once.
    The queue can be flushed manually by calling `DataSet.flush()`, or can be
    flushed after a configured delay or maximum number of entries.

    When `queue` is true, a queue is created with default options. Options can
    be specified by providing an object:

    - `delay`: `null | number` = `null`

      The queue will be flushed automatically after an inactivity of this delay
      in milliseconds. Can be turned off by supplying `null`.

    - `max`:`number`= `Number.POSITIVE_INFINITY`

      When the queue exceeds the given maximum number of entries, the queue is
      flushed automatically. Can be turned off by supplying
      `Number.POSITIVE_INFINITY`.

## Methods

[Data Set](../data-set) contains the following methods:

### add

```typescript
interface DataSet {
  add(data: Item | Item[], senderId?: Id): Id[];
}
```

Add one or multiple items to the [Data Set](../data-set). `data` can be a single
item or an array of items. Adding an item will throw when there already is an
item with the same id. This method returns an array with the ids of the added
items.

After the items are added to the [Data Set](../data-set), the
[Data Set](../data-set) will trigger an [add event](#add-event). When the
optional `senderId` is provided, this id will be passed with the triggered event
to all subscribers.

See section [Data Manipulation](#data-manipulation) for example use.

### clear

```typescript
interface DataSet {
  clear(senderId?: Id): Id[];
}
```

Clear all data from the [Data Set](../data-set). This method returns an array
with the ids of the removed items.

After the items are removed, the [Data Set](../data-set) will trigger a
[remove event](#remove-event) for all removed items. When the optional
`senderId` is provided, this id will be passed with the triggered event to all
subscribers.

See section [Data Manipulation](#data-manipulation) for example use.

### distinct

```typescript
interface DataSet {
  distinct(field: keyof Item): any[];
}
```

Find all distinct values of a specified property. Returns an unordered array
containing all distinct values. Data items that do not contain the specified
property are ignored.

### flush

```typescript
interface DataSet {
  flush(): void;
}
```

Flush queued changes. Only available when the [Data Set](../data-set) is
configured with the option `queue`, see section [Construction](#construction).

### forEach

```typescript
interface DataSet {
  forEach(callback: (item: Item, id: Id) => void, options?: Object): void;
}
```

Execute a callback function for every item in the dataset. The available options
are described in section [Data Selection](#data-selection).

### get

```typescript
interface DataSet {
  get(options?: Object): Record<Id, Item> | Item[];
  get(id: Id, options?: Object): Record<Id, Item> | Item | null;
  get(ids: Id[], options?: Object): Record<Id, Item> | Item[];
}
```

Get a single item, multiple items, or all items from the
[Data Set](../data-set). Usage examples can be found in section
[Getting Data](#getting-data). The available `options` are described in section
[Data Selection](#data-selection). When a single id is requested and not found
`null` is returned.

### getDataSet

```typescript
interface DataSet {
  getDataSet(): this;
}
```

Get the DataSet itself. This is here for compatiblity between
[Data View](../data-view) and [Data Set](../data-set), see
[Data View's getDataSet](../data-view/#getdataset) for more details.

### getIds

```typescript
interface DataSet {
  getIds(options?: Object): Id[];
}
```

Get ids of all items or of a filtered set of items. Available `options` are
described in section [Data Selection](#data-selection), except that option
`fields` is not applicable in case of `getIds`.

### map

```typescript
interface DataSet {
  map(callback: (item: Item, id: Id) => Value, options?: Object): Value[];
}
```

Map every item in the [Data Set](../data-set) to a new value. The available
options are described in section [Data Selection](#data-selection).

### max

```typescript
interface DataSet {
  max(field: keyof Item): Item | null;
}
```

Find the item with maximum value of specified property. Returns `null` if no
item was found.

### min

```typescript
interface DataSet {
  min(field: keyof Item): Item | null;
}
```

Find the item with minimum value of specified property. Returns `null` if no
item was found.

### off

```typescript
interface DataSet {
  off(event: "add" | "update" | "remove" | "*", callback: Function): void;
}
```

Unsubscribe from an event, remove an event listener. See section
[subscriptions](#subscriptions).

### on

```typescript
interface DataSet {
  on(event: "add" | "update" | "remove" | "*", callback: Function): void;
}
```

Subscribe to an event, add an event listener. See section
[subscriptions](#subscriptions).

### remove

```typescript
interface DataSet {
  remove(ids: Id | Item | (Id | Item)[], senderId?: Id): Id[];
}
```

Remove one or more items by id or by the items themselves (only the id is used,
not the reference). Returns an array with the ids of the removed items.
Nonexisting items are silently ignored and their ids are not part of the
returned array.

After the items are removed, the [Data Set](../data-set) will trigger a
[remove event](#remove-event) for the removed items. When the optional
`senderId` is provided, this id will be passed with the triggered event to all
subscribers.

See section [Data Manipulation](#data-manipulation) for example use.

### setOptions

```typescript
interface DataSet {
  setOptions(options: Object): void;
}
```

Set options for the [Data Set](../data-set). The same options are available as
in [Construction](#construction) except for `fieldId` which cannot be changed
after construction.

### update

```typescript
interface DataSet {
  update(data: Partial<Item>, senderId?: Id): Id[];
}
```

Update one or multiple existing items. `data` can be a single item or an array
with items. When an item doesn't exist, it will be created. Returns an array
with the ids of the added and updated items. See section
[Data Manipulation](#data-manipulation).

After the items are updated, the [Data Set](../data-set) will trigger an
[add event](#add-event) for the added items, and an
[update event](#update-event) for updated items. When the optional `senderId` is
provided, this id will be passed with the triggered event to all subscribers.

Note for TypeScript users: This is a possible hole in type safety as it can save
partial items into the [Data Set](../data-set) even when it is prohibited by the
types. Consider using [add](#add) and [updateOnly](#updateonly) instead.

See section [Data Manipulation](#data-manipulation) for example use.

### updateOnly

```typescript
interface DataSet {
  updateOnly(data: Partial<Item>, senderId?: Id): Id[];
}
```

Update one or multiple existing items. This is the same as [update](#update)
except that it throws if the updated item doesn't exists. This prevents partial
items from slipping through type checking.

## Properties

DataSet contains the following properties:

### length

```typescript
interface DataSet {
  length: number;
}
```

The number of items in the [Data Set](../data-set).

## Subscriptions

One can subscribe to changes in the [Data Set](../data-set). A subscription can
be created using the method `on`, and removed with `off`.

Each event callback receives two to three parameters:

- `event`: `"add" | "update" | "remove"`

  The name of the event.

- `payload`: `Object`

  Optional payload providing more information about the event like an array of
  ids of affected items or, where applicable, an array of old data no longer
  present in the [Data Set](../data-set). This is specific to each event and
  described bellow ([add](#add-event), [update](#update-event) and
  [remove](#remove-event)).

- `senderId`: `null | Id`

  A sender id, optionally provided by the application code which triggered the
  event. If senderId is not provided, the argument will be `null`.

### Subscription Example

:::: tabs

::: tab TypeScript

```typescript
import { DataSet } from "vis-data";

interface Item {
  id: number;
  text: string;
}

// create a DataSet
const data = new vis.DataSet<Item, "id">();

// subscribe to any change in the DataSet
data.on("*", (event, properties, senderId): void => {
  console.log(
    "event:",
    event,
    "properties:",
    properties,
    "senderId:",
    senderId
  );
});

// add an item and therefore trigger an "add" event
data.add({ id: 1, text: "item 1" });
// update an item and therefore trigger an "update" event
data.updateOnly({ id: 1, text: "item 1 (updated)" });
// remove an item and therefore trigger a "remove" event
data.remove(1);
```

:::

::: tab JavaScript

```javascript
// create a DataSet
const data = new vis.DataSet();

// subscribe to any change in the DataSet
data.on("*", (event, properties, senderId) => {
  console.log(
    "event:",
    event,
    "properties:",
    properties,
    "senderId:",
    senderId
  );
});

// add an item and therefore trigger an "add" event
data.add({ id: 1, text: "item 1" });
// update an item and therefore trigger an "update" event
data.update({ id: 1, text: "item 1 (updated)" });
// remove an item and therefore trigger a "remove" event
data.remove(1);
```

:::

::::

### Add Event

```typescript
type AddEventCallback = (
  name: "add",
  payload: { items: Id[] },
  senderId?: Id
) => void;
```

The add event is triggered when an item or a set of items was added, or when an
item was updated while not yet existing.

### Update Event

```typescript
type UpdateEventCallback = (
  name: "update",
  payload: { items: Id[]; oldData: Item[] },
  senderId?: Id
) => void;
```

The update event is triggered when an existing item or a set of existing items
was updated.

### Remove Event

```typescript
type RemoveEventCallback = (
  name: "remove",
  payload: { items: Id[]; oldData: Item[] },
  senderId?: Id
) => void;
```

The remove event is triggered when an item or a set of items was removed.

### Any Event

The `"*"` event is triggered when any of the events (add, update, and remove)
occurs. Since this special event receives all events it has to be able to handle
any of them.

## Data Manipulation

The data in a DataSet can be manipulated using the methods [add](#add),
[update](#update), [updateOnly](#updateonly), [remove](#remove) and
[clear](#clear). All these methods return the ids of affected items and trigger
corresponding events ([add](#add-event), [update](#update-event) and
[remove](#remove-event)) after the changes were performed.

### Manipulation Example

:::: tabs

::: tab TypeScript

```typescript
import { DataSet } from "vis-data";

interface Item {
  id: number;
  text: string;
}

// create a DataSet
const data = new vis.DataSet<Item, "id">();

// add items
const addedItemIds = data.add(
  [
    { id: 1, text: "item 1" },
    { id: 2, text: "item 2" },
    { id: 3, text: "item 3" }
  ],
  "sent-from-example"
);

// update an item
const affectedItemIds = data.updateOnly(
  { id: 2, text: "item 2 (updated)" },
  "sent-from-example"
);

// remove an item
const removedItemIds = data.remove(3, "sent-from-example");

// remove all items
const clearedItemIds = data.clear("sent-from-example");
```

:::

::: tab JavaScript

```javascript
// create a DataSet
const data = new vis.DataSet();

// add items
const addedItemIds = data.add(
  [
    { id: 1, text: "item 1" },
    { id: 2, text: "item 2" },
    { id: 3, text: "item 3" }
  ],
  "sent-from-example"
);

// update an item
const affectedItemIds = data.updateOnly(
  { id: 2, text: "item 2 (updated)" },
  "sent-from-example"
);

// remove an item
const removedItemIds = data.remove(3, "sent-from-example");

// remove all items
const clearedItemIds = data.clear("sent-from-example");
```

:::

::::

## Data Selection

The [Data Set](../data-set) contains functionality to filter and sort data via
supplying options to the methods `get`, `getIds`, `forEach`, and `map`. These
options have the following optional properties:

- `fields`: `string[] | Record<keyof Item, string>`

  An array with property names, or an object mapping current property names (the
  key) to new property names (the value). By default, all properties of the
  items are emitted. When `fields` is defined, only the properties whose names
  are specified in `fields` will be included in the returned items.

  Note for TypeScript users: Do not use this. There is no support for this in
  the types. Consider using the callback of [map](#map) and processing the
  returned array instead.

- `filter`: `(item: Item) => boolean`

  Items can be filtered using custom criteria by providing a filter function. A
  filter function is executed for each item in the [Data Set](../data-set), and
  is called with the item as it's sole parameter. The function must return a
  boolean. All items for which the filter function returns true will be emitted.
  See section [Data Filtering](#data-filtering).

- `order`: `keyof Item | (a: Item, b: Item) => number`

  Order the items by the value of given property or using custom item comparator
  function.

- `returnType`: `"Array" | "Object"` = `"Array"`

  Determine the type of output of the get function. The default `returnType` is
  `"Array"` which returns an array for an array of ids or for a single id an
  item or null. The `"Object"` return type will return a dictionary style object
  with the ids as keys and corresponding items as values (`Record<Id, Item>`).

### Selection Example

The following example demonstrates filtering items and their properties:

:::: tabs

::: tab TypeScript

```typescript
import { DataSet } from "vis-data";

interface Item {
  id: number;
  text: string;
  date: Date | string;
  group: number;
  first?: true;
}

// create a DataSet
const data = new vis.DataSet<Item, "id">([
  { id: 1, text: "item 1", date: "2013-06-20", group: 1, first: true },
  { id: 2, text: "item 2", date: "2013-06-23", group: 2 },
  { id: 3, text: "item 3", date: "2013-06-25", group: 2 },
  { id: 4, text: "item 4" }
]);

// retrieve filtered items with filtered properties
const items = data.get({
  fields: ["id", "date", "group"], // get only the specified properties
  filter: item => item.group === 2 // get only items from the specified group
});
```

:::

::: tab JavaScript

```javascript
// create a DataSet
const data = new vis.DataSet([
  { id: 1, text: "item 1", date: "2013-06-20", group: 1, first: true },
  { id: 2, text: "item 2", date: "2013-06-23", group: 2 },
  { id: 3, text: "item 3", date: "2013-06-25", group: 2 },
  { id: 4, text: "item 4" }
]);

// retrieve filtered items with filtered properties
const items = data.get({
  fields: ["id", "date", "group"], // get only the specified properties
  filter: item => item.group === 2 // get only items from the specified group
});
```

:::

::::
