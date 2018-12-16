const GET_RECORDS = 'GET_RECORDS';
const CREATE_RECORD = 'CREATE_RECORD';
const UPDATE_RECORD = 'UPDATE_RECORD';

const addrecord = (items, payload) => {
  return [...items, payload];
};

const updaterecord = (items, payload) => {
  if (items.some(i => i.id == payload.id)) {
    return items.map(i => i.id == payload.id ? { ...i, ...payload } : i);
  }
};


export default function (state = {
  records: [{
    recordArray: [],
    recordName: 'test',
    id: 2312,
    createdAt: 123123213
  }]
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

    default:
      return { ...state };
  }
};