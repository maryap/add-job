import * as actionTypes from '../actions'

const initialState = {
    tableData: [],
    editData: null,
    modal: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TABLE_DATA:
            const list = []
            list.unshift(action.data)
            const newArr = list.concat(state.tableData)
            return {
                ...state,
                tableData: newArr
            }
        case actionTypes.MODAL_OPEN:
            return {
                ...state,
                modal: true,
                editData: action.data
            }
        case actionTypes.MODAL_CLOSE:
            return {
                ...state,
                modal: false
            }
        case actionTypes.DELETE:
            const returnArr = state.tableData.filter(item => item.id !== action.item.id)
            return {
                ...state,
                tableData: returnArr
            }
        case actionTypes.EDIT:
            const updatedData = state.tableData.map(item => (item.id === action.item.id ? { ...item, priority: action.item.priority } : item))
            return {
                ...state,
                tableData: updatedData,
                modal: false
            }
        default:
    }
    return state;
}

export default reducer