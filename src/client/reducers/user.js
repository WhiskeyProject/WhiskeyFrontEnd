const userInitialState = {
  likedwhiskey: [],
  usersearches: [],
  tagSearch: [],
  itemCount: 0,
  containerInfo: []

}

export default function (state = userInitialState, action) {
  // var newState = Object.assign({}, state)

  switch (action.type) {
    
    case 'GET_LIKES':
        return {
          usersearches: state.usersearches,
          likedwhiskey: action.likedwhiskey,
          tagSearch: state.tagSearch,
          itemCount: state.itemCount,
          containerInfo: action.containerInfo
        }

    case 'GET_SEARCHES':    
        return {
          usersearches: [...state.usersearches, ...action.usersearches],
          likedwhiskey: state.likedwhiskey,
          tagSearch: state.tagSearch,
          itemCount: state.itemCount,
          containerInfo: state.containerInfo
        }

    case 'GET_TAGSEARCH':    
        return {
          usersearches: state.usersearches,
          likedwhiskey: state.likedwhiskey,
          tagSearch: action.tagSearch,
          itemCount: action.itemCount,
          containerInfo: action.containerInfo
        }

    case 'GET_MORE':
        return {
          usersearches: state.usersearches,
          likedwhiskey: state.likedwhiskey,
          tagSearch: [...state.tagSearch, ...action.tagSearch],
          itemCount: state.itemCount,
          containerInfo: [...state.containerInfo, ...action.containerInfo]
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
