/**
 * Use to communicate the type of calculation requested
 */
export enum CalculationsEnum 
{
    PICK_REQUESTED_ON_STAGE = "Pick requested on filtered message",
    DIFF_REQUESTED_ON_STAGE = "Diff requested on filtered messages",
    SUM_REQUESTED_ON_STAGE = "summation requested on filtered messages",
    MEAN_REQUESTED_ON_STAGE = "mean calculation requested on filtered messages",
    SUM_REQUESTED_ON_STACK = "sum calculation requested on stack",
    MEAN_REQUESTED_ON_STACK = "mean calculation requested on stack",
    DIFF_REQUESTED_ON_STACK = "difference calculation requested on stack",
    FRACTION_REQUESTED_ON_STACK = "fraction calculation requested on stack"
}
