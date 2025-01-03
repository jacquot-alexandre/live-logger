namespace Samples
{
    internal class NotebookSpecficObject
    {
        private int itemIndex;

        public int ItemIndex
        {
            get => itemIndex;

            set => itemIndex = value;
        }

        private int delay;

        public int Delay
        {
            get => delay;
            set => this.delay = value;
        }

        private int threadId;

        public int ThreadId
        {
            get => this.threadId;

            set => this.threadId = value;
        }
    }
}
