# Guide

## Data Set

A `DataSet` can be used to store JSON objects by id. Objects can be added,
updated and removed from the DatSet, and one can subscribe to changes in the
`DataSet`. The data in the `DataSet` can be filtered and ordered, and fields
(like dates) can be converted to a specific type. Data can be normalized when
appending it to the `DataSet` as well.

[Go to the documentation of Data Set](./data-set)

## Data View

A `DataView` offers a filtered and/or formatted view on a DataSet. One can
subscribe to changes in a `DataView`, and easily get filtered or formatted data
without having to specify filters and field types all the time.

[Go to the documentation of Data View](./data-view)

## Data Pipe

A `DataPipe` takes items from one `DataSet` or `DataView`, transforms them and
puts them into another `DataSet`.

[Go to the documentation of Data Pipe](./data-pipe)
