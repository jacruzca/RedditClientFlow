// @flow
import {
    FIRST_SAMPLE_ACTION
} from './types';

type FirstSampleAction = {
    +type: typeof FIRST_SAMPLE_ACTION,
    +payload: any
}

export type Action =
    | FirstSampleAction;

const firstSampleAction = (sampleItem: any) => {
    return { type: FIRST_SAMPLE_ACTION, payload: sampleItem }
};

export const actionCreators = {
    firstSampleAction
};