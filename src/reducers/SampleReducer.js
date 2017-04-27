// @flow
import type { Action } from '../actions/SampleActions';
import {
    FIRST_SAMPLE_ACTION
} from '../actions/types';

type State = {
    sampleItem: any
};

// Initial state
const initialState: State = {
    sampleItem: null
};

export default (state: State = initialState, action: Action) => {
    const { type, payload } = action;
    
    switch (type) {
        case FIRST_SAMPLE_ACTION: {
            return {
                ...state,
                sampleItem: payload,
            }
        }
        default: {
            return state
        }
    }
};
