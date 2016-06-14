const showInitialState = {
	show: false,
	showSearch: false,
	showLikesSearch: false,
	showSearchItem: false,
	showMoreButton: false,
    showHeart: false

}

export default function(state = showInitialState, action){

	switch (action.type) {

		case 'CHANGE_SHOW':
			return {
				show: action.show,
				showSearch: state.showSearch,
				showLikesSearch: state.showLikesSearch,
				showSearchItem: state.showSearchItem,
				showMoreButton: state.showMoreButton,
          		showHeart: state.showHeart
			}

		case 'CHANGE_SHOWSEARCH':
			return {
				show: state.show,
				showSearch: action.showSearch,
				showLikesSearch: state.showLikesSearch,
				showSearchItem: state.showSearchItem,
				showMoreButton: state.showMoreButton,
          		showHeart: state.showHeart
			}

		case 'CHANGE_SHOWLIKESSEARCH':
			return {
				show: state.show,
				showSearch: state.showSearch,
				showLikesSearch: action.showLikesSearch,
				showSearchItem: state.showSearchItem,
				showMoreButton: state.showMoreButton,
          		showHeart: state.showHeart
			}

		case 'CHANGE_SHOWSEARCHITEM':
			return {
				show: state.show,
				showSearch: state.showSearch,
				showLikesSearch: state.showLikesSearch,
				showSearchItem: action.showSearchItem,
				showMoreButton: state.showMoreButton,
          		showHeart: state.showHeart
			}

		case 'CHANGE_SHOWMOREBUTTON':
			return {
				show: state.show,
				showSearch: state.showSearch,
				showLikesSearch: state.showLikesSearch,
				showSearchItem: state.showSearchItem,
				showMoreButton: action.showMoreButton,
          		showHeart: state.showHeart
			}

		case 'CHANGE_SHOWHEART':
			return {
				show: state.show,
				showSearch: state.showSearch,
				showLikesSearch: state.showLikesSearch,
				showSearchItem: state.showSearchItem,
				showMoreButton: state.showMoreButton,
          		showHeart: action.showHeart
			}

	default:
		return state;
	
	}
}