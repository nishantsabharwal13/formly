const GET_RECORDS = 'GET_RECORDS';
const CREATE_RECORD = 'CREATE_RECORD';
const UPDATE_RECORD = 'UPDATE_RECORD';
const DELETE_RECORD = 'DELETE_RECORD';

const addrecord = (items, payload) => {
  return [...items, payload];
};

const updaterecord = (items, payload) => {
  if (items.some(i => i.id == payload.id)) {
    return items.map(i => i.id == payload.id ? { ...i, ...payload } : i);
  }
};

const deleteRecord = (items, id) => {
  const index = items.findIndex(i => i.id === id);
  console.log(items,index)
  let newItems = [
    ...items.slice(0, index),
    ...items.slice(index + 1)
  ];
  console.log(newItems)
  return newItems;
}


export default function (state = {
  records: []
}, action = {}) {
  switch (action.type) {
    case GET_RECORDS: {
      return {
        ...state, records: [...state.records]
      };

    }

    case CREATE_RECORD: {
      return { ...state, records: addrecord(state.records, action.payload) };
    }

    case UPDATE_RECORD: {
      return { ...state, records: updaterecord(state.records, action.payload) };
    }

    case DELETE_RECORD: {
      return { ...state, records: deleteRecord(state.records, action.payload) };
    }

    default:
      return { ...state };
  }
};