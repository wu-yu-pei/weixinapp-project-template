import { mapState } from 'vuex'
import store from "@/store"

export default {
	computed: {
		...mapState(Object.keys(store.state))
	}
}
