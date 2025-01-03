/**
 * Used by subjects as payload, when communicating about options change.
 */
export enum OptionsEnum {
    NO_FILTERING = "no filtering option changed",
    SELECTED_FILTERING_KEY = "selected message key changed",
    SELECTED_SORTING_COLUMN = "selected column used for filtering changed",
    DISABLING_SORTING = "disabling sorting changed" ,
    SORTING_DIRECTION = "sorting direction changed",
    SELECTED_FILTERING_VALUE = "filtered value changed",
    FILTERING_VALUE_CHECKED = "filtering by value selected",
    USE_TOKEN = "Use token option changed",
    SELECTED_TOKEN_CHANGED = "selected token changed",
    SELECTED_DATA_SOURCE_CHANGED = "selected data source for calculation on stack changed"
}
