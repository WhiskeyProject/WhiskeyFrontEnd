const userInitialState = {
  likedwhiskey: [],
  usersearches: [],
  tagSearch: [],
  itemCount: 0

}

export default function (state = userInitialState, action) {
  // var newState = Object.assign({}, state)

  switch (action.type) {
    
    case 'GET_LIKES':
        return {
          usersearches: state.usersearches,
          likedwhiskey: action.likedwhiskey,
          tagSearch: state.tagSearch,
          itemCount: state.itemCount
        }

    case 'GET_SEARCHES':    
        return {
          usersearches: [...state.usersearches, ...action.usersearches],
          likedwhiskey: state.likedwhiskey,
          tagSearch: state.tagSearch,
          itemCount: state.itemCount
        }

    case 'GET_TAGSEARCH':    
        return {
          usersearches: state.usersearches,
          likedwhiskey: state.likedwhiskey,
          tagSearch: action.tagSearch,
          itemCount: action.itemCount
        }

    case 'GET_MORE':
        return {
          usersearches: state.usersearches,
          likedwhiskey: state.likedwhiskey,
          tagSearch: [...state.tagSearch, ...action.tagSearch],
          itemCount: state.itemCount
        }

    // case 'TOGGLE_HIGHLIGHT':
    //     return {
    //       usersearches: state.usersearches,
    //       likedwhiskey: state.likedwhiskey,
    //       tagSearch: state.tagSearch,
    //       highlight: action.highlight
    //     }

    default:
      return state;
  }
}
