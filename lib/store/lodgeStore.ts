import { create } from 'zustand'

interface Lodge {
    title: string,
    user: string,
    price: number,
    host: {
        hostName: string,
        superHost: boolean,
        responseRate: number,
        reviews: number,
        rating: number
    }
}

interface LodgeState {
    lodges: Lodge[],
    selectedLodge: Lodge | null,
    setLodges: (lodges: Lodge[]) => void
    setSelectedLodge: (lodge: Lodge | null) => void
}

export const useLodgeStore = create<LodgeState>((set) => ({
    lodges: [],
    selectedLodge: null,
    setLodges: (lodges) => set({ lodges }),
    setSelectedLodge: (lodge) => set({ selectedLodge: lodge })
}))