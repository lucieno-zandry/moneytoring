import { create } from "zustand"

type ScreenLoaderStore = {
    active: boolean,
    toggle: () => void
}

export default create<ScreenLoaderStore>(set => ({
    active: false,
    toggle: () => set(state => ({ ...state, active: !state.active }))
}))