import { create } from "zustand";

const useStore = create(set => ({
    showOffcanvas: false,
    setShowOffcanvas: value => set({ showOffcanvas: value })
}))

export default useStore