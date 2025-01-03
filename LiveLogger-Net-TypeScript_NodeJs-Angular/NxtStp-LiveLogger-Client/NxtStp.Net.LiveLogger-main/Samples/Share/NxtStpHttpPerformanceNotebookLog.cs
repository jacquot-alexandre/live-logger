using NxtStpHttpClientLib;

namespace Samples
{
    internal class NxtStpHttpPerformanceNotebookLog : NxtStpHttpPerformanceLog
    {
        public override void BeginLog(params object[] objects)
        {
            base.BeginLog(objects); // log starting time, and store it to M0
            this.MessagesDictionary.Add("ItenIndex", ((NotebookSpecficObject)objects[0]).ItemIndex.ToString());
            this.MessagesDictionary.Add("Delay", ((NotebookSpecficObject)objects[0]).Delay.ToString());
            this.MessagesDictionary.Add("Begin thread Id", ((NotebookSpecficObject)objects[0]).ThreadId.ToString());
        }

        public override void EndLog(params object[] objects)
        {
            this.MessagesDictionary.Add("End thread Id", ((int)objects[0]).ToString());
            base.EndLog(objects);
        }
    }
}
