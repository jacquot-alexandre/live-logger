export enum StackOperationEnum {
    NONE ="",
    CLEAR_STACK = "clear the stack",
    ROTATE_UPWARD = "Rotate stack upward, bringing elements toward the top.",
    ROTATE_DOWNWARD = "Rotate stack downward, bringing elements toward the bottom.",
    POP_TO_STAGE = "Take and remove the top most element of teh stack and put it on the stage.",
    PEEK_TO_STAGE = "Take and but do not remove the top most element of teh stack and put it on the stage.",
    PUSH_TO_STACK = "push stage on the stack"
}
